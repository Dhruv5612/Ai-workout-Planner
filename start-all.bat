@echo off
echo Starting AI Workout Planner Backend and Frontend...
start "AI Workout Planner - Backend (Port 5000)" cmd /k "cd /d %~dp0ai-workout-planner\backend && npm start"
start "AI Workout Planner - Frontend (Port 3000)" cmd /k "cd /d %~dp0ai-workout-planner\frontend && npm start"
echo Both servers are launching in separate windows.

