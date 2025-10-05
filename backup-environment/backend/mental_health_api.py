from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import datetime
import random
import uuid

app = Flask(__name__)
CORS(app)

# Mental health data storage (in production, use a proper database)
user_sessions = {}
mood_history = {}
breath_sessions = {}

# Enhanced mental health database
mental_health_data = {
    "symptoms": [
        {"id": 1, "name": "Anxiety", "category": "emotional"},
        {"id": 2, "name": "Depression", "category": "emotional"},
        {"id": 3, "name": "Stress", "category": "emotional"},
        {"id": 4, "name": "Insomnia", "category": "sleep"},
        {"id": 5, "name": "Poor Concentration", "category": "cognitive"},
        {"id": 6, "name": "Low Energy", "category": "physical"},
        {"id": 7, "name": "Irritability", "category": "emotional"},
        {"id": 8, "name": "Muscle Tension", "category": "physical"}
    ],
    "exercises": {
        "anxiety": [
            {
                "id": 1,
                "name": "4-7-8 Breathing",
                "description": "Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds",
                "duration": "5-10 minutes",
                "steps": [
                    "Sit comfortably with straight back",
                    "Inhale quietly through nose for 4 seconds",
                    "Hold breath for 7 seconds",
                    "Exhale completely through mouth for 8 seconds",
                    "Repeat 4-8 times"
                ],
                "benefits": "Reduces anxiety, promotes relaxation"
            }
        ],
        "depression": [
            {
                "id": 3,
                "name": "Gratitude Journaling",
                "description": "Write down things you are grateful for",
                "duration": "5-10 minutes daily",
                "steps": [
                    "Find a quiet comfortable space",
                    "Write 3-5 things you are grateful for",
                    "Be specific and detailed",
                    "Reflect on why each item matters",
                    "Repeat daily for best results"
                ],
                "benefits": "Improves mood, shifts perspective"
            }
        ]
    },
    "yoga_poses": {
        "anxiety": [
            {
                "id": 1,
                "name": "Balasana (Child's Pose)",
                "description": "Resting pose that calms the mind",
                "duration": "1-3 minutes",
                "steps": [
                    "Kneel on floor with big toes touching",
                    "Sit back on heels, knees wide",
                    "Fold forward, resting forehead on mat",
                    "Arms extended forward or alongside body",
                    "Breathe deeply and relax"
                ],
                "benefits": "Calms nervous system, relieves stress"
            }
        ]
    }
}
exercise_library = {
    "breathing": [
        {
            "id": "478_breathing",
            "name": "4-7-8 Breathing",
            "duration": 5,
            "instructions": [
                "Inhale through nose for 4 counts",
                "Hold breath for 7 counts", 
                "Exhale through mouth for 8 counts",
                "Repeat 4 cycles"
            ],
            "benefits": ["Reduces anxiety", "Improves sleep", "Lowers stress"]
        },
        {
            "id": "box_breathing",
            "name": "Box Breathing",
            "duration": 8,
            "instructions": [
                "Inhale for 4 counts",
                "Hold for 4 counts",
                "Exhale for 4 counts", 
                "Hold empty for 4 counts"
            ],
            "benefits": ["Calms nervous system", "Improves focus", "Reduces stress"]
        }
    ],
    "yoga": [
        {
            "id": "stress_relief",
            "name": "Stress Relief Flow",
            "duration": 15,
            "poses": [
                {"name": "Child's Pose", "duration": 120, "instruction": "Kneel and fold forward, arms extended"},
                {"name": "Cat-Cow", "duration": 60, "instruction": "Alternate arching and rounding spine"},
                {"name": "Forward Fold", "duration": 60, "instruction": "Stand and fold forward"},
                {"name": "Legs Up Wall", "duration": 180, "instruction": "Lie with legs up against wall"}
            ],
            "benefits": ["Releases tension", "Calms mind", "Improves circulation"]
        },
        {
            "id": "energy_boost",
            "name": "Energy Boost Flow", 
            "duration": 12,
            "poses": [
                {"name": "Sun Salutation", "duration": 180, "instruction": "Flow through complete sequence"},
                {"name": "Warrior I", "duration": 60, "instruction": "Lunge with arms overhead"},
                {"name": "Tree Pose", "duration": 60, "instruction": "Balance on one foot"},
                {"name": "Camel Pose", "duration": 30, "instruction": "Kneel and arch back"}
            ],
            "benefits": ["Increases energy", "Improves strength", "Boosts mood"]
        }
    ],
    "meditation": [
        {
            "id": "body_scan",
            "name": "Body Scan Meditation",
            "duration": 15,
            "instructions": [
                "Lie down comfortably",
                "Start at your toes, notice sensations",
                "Slowly move attention up your body",
                "Spend 1-2 minutes on each body part",
                "End at the top of your head"
            ],
            "benefits": ["Reduces tension", "Increases awareness", "Promotes relaxation"]
        }
    ]
}

mood_recommendations = {
    "stressed": {
        "primary_exercises": ["478_breathing", "stress_relief", "body_scan"],
        "quick_tips": [
            "Take a 5-minute break every hour",
            "Practice deep breathing",
            "Limit caffeine intake",
            "Get some fresh air"
        ],
        "color": "#EF4444"
    },
    "anxious": {
        "primary_exercises": ["box_breathing", "stress_relief", "body_scan"],
        "quick_tips": [
            "Use the 5-4-3-2-1 grounding technique",
            "Stay in the present moment",
            "Avoid caffeine",
            "Practice gratitude"
        ],
        "color": "#F59E0B"
    },
    "sad": {
        "primary_exercises": ["energy_boost", "478_breathing"],
        "quick_tips": [
            "Connect with loved ones",
            "Get some sunlight",
            "Practice self-compassion",
            "Do gentle movement"
        ],
        "color": "#3B82F6"
    },
    "angry": {
        "primary_exercises": ["478_breathing", "energy_boost"],
        "quick_tips": [
            "Count to 10 before reacting",
            "Remove yourself from triggers",
            "Use physical outlets",
            "Practice deep breathing"
        ],
        "color": "#DC2626"
    },
    "tired": {
        "primary_exercises": ["energy_boost", "box_breathing"],
        "quick_tips": [
            "Stay hydrated",
            "Get natural light exposure",
            "Take a 20-minute power nap",
            "Do energizing stretches"
        ],
        "color": "#6B7280"
    },
    "overwhelmed": {
        "primary_exercises": ["body_scan", "stress_relief", "478_breathing"],
        "quick_tips": [
            "Write down all your thoughts",
            "Prioritize your tasks",
            "Break things into smaller steps",
            "Ask for help when needed"
        ],
        "color": "#8B4513"
    }
}

@app.route('/api/mental-health/analyze-symptoms', methods=['POST'])
def analyze_symptoms():
    data = request.get_json()
    user_id = data.get('user_id', 'anonymous')
    symptoms_list = data.get('symptoms', [])
    
    if not symptoms_list:
        return jsonify({"error": "No symptoms provided"}), 400
    
    # Symptom analysis logic
    analysis = analyze_symptom_patterns(symptoms_list)
    
    # Store symptom history
    if user_id not in mood_history:
        mood_history[user_id] = []
    
    symptom_entry = {
        "type": "symptom_analysis",
        "symptoms": symptoms_list,
        "condition": analysis['condition'],
        "severity": analysis['severity'],
        "timestamp": datetime.datetime.now().isoformat()
    }
    mood_history[user_id].append(symptom_entry)
    
    return jsonify(analysis)

@app.route('/api/mental-health/analyze-mood', methods=['POST'])
def analyze_mood():
    data = request.get_json()
    user_id = data.get('user_id', 'anonymous')
    mood = data.get('mood')
    intensity = data.get('intensity', 5)  # 1-10 scale
    
    if mood not in mood_recommendations:
        return jsonify({"error": "Invalid mood"}), 400
    
    # Store mood history
    if user_id not in mood_history:
        mood_history[user_id] = []
    
    mood_entry = {
        "mood": mood,
        "intensity": intensity,
        "timestamp": datetime.datetime.now().isoformat(),
        "recommendations_given": mood_recommendations[mood]["primary_exercises"]
    }
    mood_history[user_id].append(mood_entry)
    
    # Get recommendations
    recommendations = mood_recommendations[mood]
    exercises = []
    
    for exercise_id in recommendations["primary_exercises"]:
        # Find exercise in library
        for category in exercise_library.values():
            for exercise in category:
                if exercise["id"] == exercise_id:
                    exercises.append(exercise)
                    break
    
    return jsonify({
        "mood": mood,
        "intensity": intensity,
        "recommendations": {
            "exercises": exercises,
            "quick_tips": recommendations["quick_tips"],
            "color": recommendations["color"]
        },
        "mood_trend": get_mood_trend(user_id)
    })

@app.route('/api/mental-health/complete-session', methods=['POST'])
def complete_session():
    data = request.get_json()
    user_id = data.get('user_id', 'anonymous')
    exercise_id = data.get('exercise_id')
    duration_completed = data.get('duration_completed')
    rating = data.get('rating')  # 1-5 how helpful it was
    
    if user_id not in user_sessions:
        user_sessions[user_id] = []
    
    session = {
        "exercise_id": exercise_id,
        "duration_completed": duration_completed,
        "rating": rating,
        "timestamp": datetime.datetime.now().isoformat(),
        "date": datetime.date.today().isoformat()
    }
    user_sessions[user_id].append(session)
    
    # Calculate streak and stats
    stats = calculate_user_stats(user_id)
    
    return jsonify({
        "message": "Session completed successfully",
        "stats": stats,
        "achievement": check_achievements(user_id, stats)
    })

@app.route('/api/mental-health/get-stats/<user_id>')
def get_user_stats(user_id):
    stats = calculate_user_stats(user_id)
    return jsonify(stats)

@app.route('/api/mental-health/get-exercises')
def get_exercises():
    return jsonify(exercise_library)

@app.route('/api/mental-health/mood-history/<user_id>')
def get_mood_history(user_id):
    history = mood_history.get(user_id, [])
    return jsonify({
        "history": history[-30:],  # Last 30 entries
        "trend": get_mood_trend(user_id)
    })

def calculate_user_stats(user_id):
    sessions = user_sessions.get(user_id, [])
    today = datetime.date.today().isoformat()
    
    # Sessions today
    today_sessions = [s for s in sessions if s["date"] == today]
    
    # Calculate streak
    streak = 0
    current_date = datetime.date.today()
    while True:
        date_str = current_date.isoformat()
        day_sessions = [s for s in sessions if s["date"] == date_str]
        if day_sessions:
            streak += 1
            current_date -= datetime.timedelta(days=1)
        else:
            break
    
    # Total time practiced
    total_minutes = sum(s["duration_completed"] for s in sessions)
    
    # Average rating
    ratings = [s["rating"] for s in sessions if s["rating"]]
    avg_rating = sum(ratings) / len(ratings) if ratings else 0
    
    return {
        "sessions_today": len(today_sessions),
        "current_streak": streak,
        "total_sessions": len(sessions),
        "total_minutes": total_minutes,
        "average_rating": round(avg_rating, 1),
        "mood_improvement": calculate_mood_improvement(user_id)
    }

def get_mood_trend(user_id):
    history = mood_history.get(user_id, [])
    if len(history) < 2:
        return "neutral"
    
    # Simple trend calculation based on recent moods
    recent_moods = history[-5:]  # Last 5 mood entries
    mood_scores = {
        "sad": 1, "angry": 2, "stressed": 3, "anxious": 3,
        "tired": 4, "overwhelmed": 2, "neutral": 5, "happy": 8, "calm": 7
    }
    
    scores = [mood_scores.get(m["mood"], 5) for m in recent_moods]
    if len(scores) >= 2:
        if scores[-1] > scores[0]:
            return "improving"
        elif scores[-1] < scores[0]:
            return "declining"
    
    return "stable"

def calculate_mood_improvement(user_id):
    # Simulate mood improvement percentage based on session frequency
    sessions = user_sessions.get(user_id, [])
    if not sessions:
        return 0
    
    # More sessions = better mood improvement
    recent_sessions = len([s for s in sessions[-7:]])  # Last week
    improvement = min(recent_sessions * 5, 25)  # Max 25% improvement
    return improvement

def analyze_symptom_patterns(symptoms_list):
    """Analyze symptom list and return condition assessment"""
    
    # Define symptom patterns and their corresponding conditions
    symptom_patterns = {
        'anxiety': {
            'keywords': ['anxious', 'anxiety', 'worry', 'nervous', 'restless', 'panic', 'fear'],
            'condition': 'Anxiety Symptoms',
            'severity': 'Moderate',
            'severity_color': '#EF4444',
            'description': 'Symptoms consistent with anxiety-related concerns',
            'treatment': [
                'Practice deep breathing exercises (4-7-8 technique)',
                'Try progressive muscle relaxation',
                'Use grounding techniques (5-4-3-2-1 method)',
                'Consider mindfulness meditation',
                'Limit caffeine intake'
            ],
            'prevention': [
                'Maintain regular sleep schedule',
                'Exercise regularly to reduce stress',
                'Practice stress management techniques',
                'Stay connected with supportive people',
                'Avoid excessive alcohol or stimulants'
            ],
            'warning': 'If anxiety symptoms persist or interfere with daily life, consider consulting a mental health professional.'
        },
        'depression': {
            'keywords': ['depressed', 'sad', 'hopeless', 'empty', 'worthless', 'guilty', 'lonely'],
            'condition': 'Depressive Symptoms',
            'severity': 'Moderate',
            'severity_color': '#DC2626',
            'description': 'Symptoms may indicate depressive episodes',
            'treatment': [
                'Engage in activities you previously enjoyed',
                'Maintain social connections',
                'Try light therapy (especially in winter)',
                'Practice gratitude journaling',
                'Consider professional counseling'
            ],
            'prevention': [
                'Regular physical exercise',
                'Maintain healthy diet',
                'Get adequate sunlight exposure',
                'Build strong social support network',
                'Practice self-compassion'
            ],
            'warning': 'Depression is a treatable condition. Please reach out to a mental health professional for proper evaluation and support.'
        },
        'sleep': {
            'keywords': ['insomnia', 'sleep', 'tired', 'fatigue', 'exhausted', 'sleepless'],
            'condition': 'Sleep Disturbance',
            'severity': 'Mild to Moderate',
            'severity_color': '#F59E0B',
            'description': 'Sleep-related issues affecting daily functioning',
            'treatment': [
                'Establish consistent sleep schedule',
                'Create relaxing bedtime routine',
                'Limit screen time before bed',
                'Try relaxation techniques before sleep',
                'Avoid caffeine 6 hours before bedtime'
            ],
            'prevention': [
                'Maintain regular sleep-wake cycle',
                'Create comfortable sleep environment',
                'Regular daytime exercise',
                'Limit daytime naps',
                'Manage stress levels'
            ]
        },
        'stress': {
            'keywords': ['stressed', 'overwhelmed', 'pressure', 'tension', 'burnout'],
            'condition': 'Stress-Related Symptoms',
            'severity': 'Mild to Moderate',
            'severity_color': '#F59E0B',
            'description': 'Common stress-related symptoms affecting wellbeing',
            'treatment': [
                'Practice time management techniques',
                'Take regular breaks throughout the day',
                'Try stress-reduction exercises',
                'Prioritize tasks and delegate when possible',
                'Practice saying no to excessive commitments'
            ],
            'prevention': [
                'Maintain work-life balance',
                'Regular physical activity',
                'Build strong support network',
                'Practice mindfulness or meditation',
                'Get adequate rest and nutrition'
            ]
        },
        'panic': {
            'keywords': ['panic', 'heart racing', 'breathless', 'chest pain', 'dizzy', 'sweating'],
            'condition': 'Panic Symptoms',
            'severity': 'High',
            'severity_color': '#DC2626',
            'description': 'Symptoms consistent with panic attacks or severe anxiety',
            'treatment': [
                'Practice immediate grounding techniques',
                'Use controlled breathing exercises',
                'Remove yourself from triggering situations',
                'Seek immediate professional help',
                'Learn panic attack coping strategies'
            ],
            'prevention': [
                'Identify and avoid known triggers',
                'Regular stress management',
                'Avoid stimulants like caffeine',
                'Learn early warning signs',
                'Maintain healthy lifestyle'
            ],
            'warning': 'Panic attacks can be serious and frightening. Please consult a healthcare provider for proper evaluation and treatment.'
        }
    }
    
    # Direct symptom mapping for precise analysis
    symptom_conditions = {
        'anxiety': symptom_patterns['anxiety'],
        'depression': symptom_patterns['depression'], 
        'insomnia': symptom_patterns['sleep'],
        'panic': symptom_patterns['panic'],
        'fatigue': symptom_patterns['sleep'],
        'overwhelmed': symptom_patterns['stress'],
        'headache': {
            'condition': 'Tension Headaches',
            'severity': 'Mild to Moderate',
            'severity_color': '#A855F7',
            'description': 'Recurring head pain often stress-related',
            'treatment': [
                'Apply cold/warm compress to head and neck',
                'Practice neck and shoulder stretches',
                'Stay hydrated (8-10 glasses daily)',
                'Try relaxation techniques',
                'Maintain regular meal schedule'
            ],
            'prevention': [
                'Manage stress levels effectively',
                'Maintain good posture at work',
                'Regular sleep schedule (7-9 hours)',
                'Limit screen time and eye strain',
                'Avoid known trigger foods'
            ]
        },
        'irritable': {
            'condition': 'Irritability',
            'severity': 'Mild to Moderate', 
            'severity_color': '#EF4444',
            'description': 'Increased sensitivity and quick to anger',
            'treatment': [
                'Practice deep breathing when triggered',
                'Take 10-second timeout before reacting',
                'Use physical exercise to release tension',
                'Practice mindfulness meditation',
                'Identify underlying stressors'
            ],
            'prevention': [
                'Maintain regular sleep schedule',
                'Eat balanced meals every 3-4 hours',
                'Regular physical activity (30 min daily)',
                'Practice daily stress management',
                'Communicate needs clearly to others'
            ]
        },
        'concentration': {
            'condition': 'Attention Difficulties',
            'severity': 'Mild to Moderate',
            'severity_color': '#22C55E', 
            'description': 'Difficulty focusing and maintaining attention',
            'treatment': [
                'Use 25-minute focused work sessions',
                'Eliminate distractions in environment',
                'Practice mindfulness meditation daily',
                'Take 5-minute breaks every hour',
                'Use organizational tools and task lists'
            ],
            'prevention': [
                'Maintain consistent sleep schedule',
                'Regular aerobic exercise',
                'Eat brain-healthy foods (omega-3, antioxidants)',
                'Limit multitasking activities',
                'Practice stress reduction techniques'
            ]
        },
        'appetite': {
            'condition': 'Appetite Changes',
            'severity': 'Mild to Moderate',
            'severity_color': '#FB923C',
            'description': 'Significant changes in eating patterns',
            'treatment': [
                'Maintain regular meal schedule (every 3-4 hours)',
                'Eat small, frequent nutrient-dense meals',
                'Stay hydrated throughout the day',
                'Practice mindful eating techniques',
                'Address emotional triggers for eating'
            ],
            'prevention': [
                'Manage stress and emotional health',
                'Regular physical activity',
                'Adequate sleep (7-9 hours nightly)',
                'Social support during meal times',
                'Address underlying mental health concerns'
            ]
        }
    }
    
    # Get analysis for primary symptom
    primary_symptom = symptoms_list[0] if symptoms_list else None
    best_match = symptom_conditions.get(primary_symptom)
    
    # Default to general wellness if no match found
    if not best_match:
        best_match = {
            'condition': 'General Wellness Concerns',
            'severity': 'Mild',
            'severity_color': '#10B981',
            'description': 'General symptoms that may benefit from wellness practices',
            'treatment': [
                'Practice regular self-care',
                'Maintain healthy lifestyle habits',
                'Try relaxation techniques',
                'Stay physically active',
                'Connect with supportive people'
            ],
            'prevention': [
                'Regular exercise and healthy diet',
                'Adequate sleep and rest',
                'Stress management practices',
                'Social connection and support',
                'Regular health check-ups'
            ]
        }
    
    return best_match

def check_achievements(user_id, stats):
    achievements = []
    
    if stats["sessions_today"] == 1:
        achievements.append("First session today! 🌟")
    elif stats["sessions_today"] == 3:
        achievements.append("Triple wellness day! 🔥")
    
    if stats["current_streak"] == 7:
        achievements.append("One week streak! 🎯")
    elif stats["current_streak"] == 30:
        achievements.append("One month streak! 🏆")
    
    if stats["total_sessions"] == 10:
        achievements.append("Wellness warrior! ⚡")
    elif stats["total_sessions"] == 50:
        achievements.append("Mindfulness master! 🧘")
    
    return achievements

# New API endpoints for enhanced mental health features
@app.route('/api/mental-health/symptoms')
def get_symptoms():
    return jsonify(mental_health_data["symptoms"])

@app.route('/api/mental-health/recommendations', methods=['POST'])
def get_recommendations():
    data = request.get_json()
    symptoms = data.get('symptoms', [])
    
    if not symptoms:
        return jsonify({"error": "Symptoms array required"}), 400
    
    recommendations = {"exercises": [], "yoga": []}
    
    for symptom_name in symptoms:
        symptom_key = symptom_name.lower()
        if symptom_key in mental_health_data["exercises"]:
            recommendations["exercises"].extend(mental_health_data["exercises"][symptom_key])
        if symptom_key in mental_health_data["yoga_poses"]:
            recommendations["yoga"].extend(mental_health_data["yoga_poses"][symptom_key])
    
    return jsonify(recommendations)

@app.route('/api/mental-health/breath-session/start', methods=['POST'])
def start_breath_session():
    session_id = str(uuid.uuid4())
    session = {
        "id": session_id,
        "start_time": datetime.datetime.now().isoformat(),
        "breath_count": 0,
        "is_active": True
    }
    breath_sessions[session_id] = session
    return jsonify({"sessionId": session_id, "message": "Breath session started"})

@app.route('/api/mental-health/breath-session/breath', methods=['POST'])
def record_breath():
    data = request.get_json()
    session_id = data.get('sessionId')
    
    if session_id not in breath_sessions:
        return jsonify({"error": "Session not found"}), 404
    
    session = breath_sessions[session_id]
    session["breath_count"] += 1
    
    return jsonify({
        "breathCount": session["breath_count"],
        "message": "Breath recorded successfully"
    })

@app.route('/api/mental-health/breath-session/end', methods=['POST'])
def end_breath_session():
    data = request.get_json()
    session_id = data.get('sessionId')
    
    if session_id not in breath_sessions:
        return jsonify({"error": "Session not found"}), 404
    
    session = breath_sessions[session_id]
    end_time = datetime.datetime.now()
    start_time = datetime.datetime.fromisoformat(session["start_time"])
    duration = (end_time - start_time).total_seconds()
    
    session["end_time"] = end_time.isoformat()
    session["is_active"] = False
    session["duration"] = duration
    
    avg_breath_rate = (session["breath_count"] / duration * 60) if duration > 0 else 0
    
    return jsonify({
        "sessionId": session_id,
        "totalBreaths": session["breath_count"],
        "duration": duration,
        "averageBreathRate": round(avg_breath_rate, 2)
    })

if __name__ == '__main__':
    app.run(debug=True, port=5001)