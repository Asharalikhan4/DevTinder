import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  PanResponder,
  TouchableOpacity,
} from 'react-native';
import Ionicons  from "react-native-vector-icons/Ionicons"; // or from 'react-native-vector-icons/Ionicons'

const users = [
  {
    _id: "1",
    name: "Sophia",
    age: 26,
    gender: "Female",
    photoUrl: "https://randomuser.me/api/portraits/women/10.jpg",
    about: "Frontend developer who loves React and design systems.",
    skills: ["React", "TailwindCSS", "Figma"],
  },
  {
    _id: "2",
    name: "Ethan",
    age: 30,
    gender: "Male",
    photoUrl: "https://randomuser.me/api/portraits/men/20.jpg",
    about: "Backend engineer passionate about Node.js and databases.",
    skills: ["Node.js", "MongoDB", "Express"],
  },
];

export default function CustomTinderCardDeck() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const pan = useRef(new Animated.ValueXY()).current;

  const nextUser = () => {
    setCurrentIndex((prev) => (prev + 1) % users.length);
    pan.setValue({ x: 0, y: 0 });
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 10;
      },
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > 120) {
          // Swipe right
          Animated.timing(pan, {
            toValue: { x: 500, y: 0 },
            duration: 200,
            useNativeDriver: false,
          }).start(nextUser);
        } else if (gesture.dx < -120) {
          // Swipe left
          Animated.timing(pan, {
            toValue: { x: -500, y: 0 },
            duration: 200,
            useNativeDriver: false,
          }).start(nextUser);
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const rotate = pan.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ['-15deg', '0deg', '15deg'],
  });

  const user = users[currentIndex];

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.card,
          {
            transform: [{ translateX: pan.x }, { rotate }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <Image source={{ uri: user.photoUrl }} style={styles.avatar} />
        <Text style={styles.name}>{user.name}, {user.age}</Text>
        <Text style={styles.about}>{user.about}</Text>
        <Text style={styles.gender}>Gender: {user.gender}</Text>
        <View style={styles.skills}>
          {user.skills.map((skill) => (
            <View key={skill} style={styles.skillBadge}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>
      </Animated.View>

      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={nextUser} style={styles.nopeButton}>
          <Ionicons name="close-outline" size={28} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity onPress={nextUser} style={styles.likeButton}>
          <Ionicons name="heart" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fdfdfd',
  },
  card: {
    width: '100%',
    maxWidth: 350,
    height: 500,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 15,
    elevation: 5,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  about: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginTop: 5,
    marginBottom: 10,
  },
  gender: {
    fontSize: 14,
    color: '#666',
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    gap: 6,
    justifyContent: 'center',
  },
  skillBadge: {
    backgroundColor: '#fee2e2',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    margin: 4,
  },
  skillText: {
    color: '#dc2626',
    fontSize: 12,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 30,
  },
  nopeButton: {
    backgroundColor: '#e5e7eb',
    padding: 14,
    borderRadius: 30,
  },
  likeButton: {
    backgroundColor: '#ef4444',
    padding: 14,
    borderRadius: 30,
  },
});
