export const mockTestData = {
  "Core Vehicle Systems": {
    Powertrain: {
      Motor: {
        testsRun: 25,
        passed: 23,
        health: "Warning",
      },
      Inverter: {
        testsRun: 18,
        passed: 18,
        health: "Good",
      },
      Transmission: {
        testsRun: 12,
        passed: 12,
        health: "Good",
      },
    },
    "Battery Management": {
      "Cell Monitoring": {
        testsRun: 45,
        passed: 44,
        health: "Good",
      },
      "Thermal Management": {
        testsRun: 30,
        passed: 28,
        health: "Warning",
      },
      "Charging System": {
        testsRun: 22,
        passed: 22,
        health: "Good",
      },
    },
    "Braking System": {
      "Regenerative Braking": {
        testsRun: 35,
        passed: 35,
        health: "Good",
      },
      "Friction Brakes": {
        testsRun: 28,
        passed: 26,
        health: "Warning",
      },
    },
  },
  Autopilot: {
    Perception: {
      "Lane Detection": {
        testsRun: 50,
        passed: 48,
        health: "Good",
      },
      "Traffic Light Recognition": {
        testsRun: 40,
        passed: 35,
        health: "Warning",
      },
      "Object Detection": {
        testsRun: 60,
        passed: 58,
        health: "Good",
      },
    },
    Planning: {
      "Path Planning": {
        testsRun: 32,
        passed: 30,
        health: "Warning",
      },
      "Speed Control": {
        testsRun: 28,
        passed: 28,
        health: "Good",
      },
    },
    Control: {
      "Steering Control": {
        testsRun: 42,
        passed: 41,
        health: "Good",
      },
      "Acceleration Control": {
        testsRun: 38,
        passed: 37,
        health: "Good",
      },
    },
  },
  Infotainment: {
    "Display System": {
      Touchscreen: {
        testsRun: 25,
        passed: 24,
        health: "Good",
      },
      "Graphics Rendering": {
        testsRun: 20,
        passed: 19,
        health: "Good",
      },
    },
    "Audio System": {
      Speakers: {
        testsRun: 15,
        passed: 15,
        health: "Good",
      },
      Microphone: {
        testsRun: 12,
        passed: 11,
        health: "Warning",
      },
    },
    Connectivity: {
      WiFi: {
        testsRun: 18,
        passed: 17,
        health: "Good",
      },
      Bluetooth: {
        testsRun: 16,
        passed: 16,
        health: "Good",
      },
      Cellular: {
        testsRun: 14,
        passed: 12,
        health: "Warning",
      },
    },
  },
}
