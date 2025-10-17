/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import licencePlatesData from './data/licencePlates.json';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  const [cityCode, setCityCode] = useState('');
  const [cityInfo, setCityInfo] = useState<string>('');

  useEffect(() => {
    if (cityCode.trim() === '') {
      setCityInfo('');
      return;
    }

    const foundPlate = licencePlatesData.find(
      (plate) => plate.Zeichen.toUpperCase() === cityCode.toUpperCase()
    );

    if (foundPlate) {
      const cities = foundPlate.Stadt_Landkreis_oder_Erklärung.join(', ');
      const bundesland = foundPlate.Bundesland;
      setCityInfo(`${cities} (${bundesland})`);
    } else {
      setCityInfo('Kennzeichen nicht gefunden');
    }
  }, [cityCode]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Kennzeichen Suche</Text>
      <View style={styles.plateContainer}>
        <View style={styles.euSection}>
          <Text style={styles.euText}>D</Text>
        </View>
        <TextInput
          style={styles.plateInputEditable}
          placeholder="XXX"
          value={cityCode}
          onChangeText={setCityCode}
          autoCapitalize="characters"
          maxLength={3}
        />
        <Text style={styles.plateTextFixed}>JH 0001</Text>
      </View>
      {cityInfo !== '' && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{cityInfo}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    color: '#333',
  },
  plateContainer: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 6,
    overflow: 'hidden',
    alignItems: 'center',
  },
  euSection: {
    width: 40,
    height: '100%',
    backgroundColor: '#003399',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 2,
    borderRightColor: '#000000',
  },
  euText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  plateInputEditable: {
    width: 80,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    paddingHorizontal: 10,
    fontFamily: 'monospace',
    textTransform: 'uppercase',
  },
  plateTextFixed: {
    flex: 1,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    fontFamily: 'monospace',
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  resultText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
});

export default App;
