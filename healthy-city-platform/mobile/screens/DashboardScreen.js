import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DashboardScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    airQuality: { aqi: 78, category: 'Moderate', color: '#FFA500' },
    greenCover: { percentage: 85, status: 'Good', color: '#28A745' },
    waterQuality: { status: 'Good', score: 82, color: '#17A2B8' },
    alerts: 3,
    location: 'Delhi, India'
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const MetricCard = ({ icon, title, value, subtitle, color, onPress }) => (
    <TouchableOpacity style={[styles.metricCard, { borderLeftColor: color }]} onPress={onPress}>
      <View style={styles.metricHeader}>
        <Ionicons name={icon} size={24} color={color} />
        <Text style={styles.metricTitle}>{title}</Text>
      </View>
      <Text style={[styles.metricValue, { color }]}>{value}</Text>
      <Text style={styles.metricSubtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );

  const QuickAction = ({ icon, title, onPress, color = '#2E8B57' }) => (
    <TouchableOpacity style={styles.quickAction} onPress={onPress}>
      <Ionicons name={icon} size={28} color={color} />
      <Text style={styles.quickActionText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.locationHeader}>
        <Ionicons name="location" size={20} color="#666" />
        <Text style={styles.locationText}>{dashboardData.location}</Text>
        <TouchableOpacity onPress={() => Alert.alert('Location', 'Updating location...')}>
          <Ionicons name="refresh" size={20} color="#2E8B57" />
        </TouchableOpacity>
      </View>

      {dashboardData.alerts > 0 && (
        <TouchableOpacity 
          style={styles.alertBanner}
          onPress={() => navigation.navigate('Alerts')}
        >
          <Ionicons name="warning" size={20} color="#FF6B35" />
          <Text style={styles.alertText}>
            You have {dashboardData.alerts} active environmental alerts
          </Text>
          <Ionicons name="chevron-forward" size={20} color="#FF6B35" />
        </TouchableOpacity>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Environmental Health</Text>
        
        <MetricCard
          icon="cloud"
          title="Air Quality"
          value={`AQI ${dashboardData.airQuality.aqi}`}
          subtitle={dashboardData.airQuality.category}
          color={dashboardData.airQuality.color}
          onPress={() => navigation.navigate('Air Quality')}
        />

        <MetricCard
          icon="leaf"
          title="Green Cover"
          value={`${dashboardData.greenCover.percentage}%`}
          subtitle={`Vegetation health: ${dashboardData.greenCover.status}`}
          color={dashboardData.greenCover.color}
          onPress={() => navigation.navigate('Green Spaces')}
        />

        <MetricCard
          icon="water"
          title="Water Quality"
          value={dashboardData.waterQuality.status}
          subtitle={`Quality score: ${dashboardData.waterQuality.score}/100`}
          color={dashboardData.waterQuality.color}
          onPress={() => navigation.navigate('Water')}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          <QuickAction
            icon="flag"
            title="Report Issue"
            onPress={() => navigation.navigate('Report')}
          />
          <QuickAction
            icon="notifications"
            title="View Alerts"
            onPress={() => navigation.navigate('Alerts')}
            color="#FF6B35"
          />
          <QuickAction
            icon="people"
            title="Join Initiative"
            onPress={() => navigation.navigate('Initiatives')}
            color="#17A2B8"
          />
          <QuickAction
            icon="map"
            title="Nearby Issues"
            onPress={() => Alert.alert('Feature', 'Nearby issues map coming soon!')}
            color="#6F42C1"
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  locationText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  alertBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3CD',
    padding: 12,
    margin: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B35',
  },
  alertText: {
    flex: 1,
    marginLeft: 8,
    color: '#856404',
    fontWeight: '500',
  },
  section: {
    margin: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  metricCard: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricTitle: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  metricSubtitle: {
    fontSize: 12,
    color: '#999',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAction: {
    backgroundColor: '#FFF',
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionText: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
});

export default DashboardScreen;