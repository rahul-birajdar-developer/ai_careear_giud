
const learningRoadmap = ({ goal, exp, hours, duration, focus }) => `
You are an expert AI Career Coach.

Generate a personalized learning roadmap.

User Details:
- Career Goal: ${goal}
- Experience Level: ${exp}
- Weekly Commitment: ${hours}
- Preferred Duration: ${duration}
- Focus Areas: ${Array.isArray(focus) ? focus.join(", ") : focus}

IMPORTANT RULES

1. Return ONLY valid JSON.
2. Do NOT use markdown.
3. Do NOT wrap the response in \`\`\`.
4. Do NOT include explanations.
5. The response must be directly parsable using JSON.parse().
6. Generate EXACTLY 6 stages.
7. Make the roadmap specific to ${goal}.
8. Do not repeat topics.
9. Progress must always be 0.
10. Generate realistic durations, resources and projects.

Return this exact JSON structure:

{
  "goal": "",
  "experience": "",
  "estimatedTime": "",
  "weeklyCommitment": "",
  "totalTopics": 0,
  "totalResources": 0,
  "totalProjects": 0,
  "stages": [
    {
      "title": "",
      "duration": "",
      "desc": "",
      "tags": [],
      "progress": 0,
      "total": 0,
      "resources": 0,
      "projects": 0,
      "subtopics": []
    }
  ],
  "finalGoal": "",
  "proTip": ""
}

Requirements:

goal:
"${goal}"

experience:
"${exp}"

estimatedTime:
Based on the goal and experience.

weeklyCommitment:
Use "${hours}"

Stages:
- Exactly 6 stages.
- Every stage must have:
  - title
  - duration
  - desc
  - 5-8 tags
  - progress = 0
  - total
  - resources
  - projects
  - 8-14 subtopics

Totals:
- totalTopics = sum of all stage.total
- totalResources = sum of all stage.resources
- totalProjects = sum of all stage.projects

finalGoal:
"Build a complete portfolio and land your dream job as a ${goal}!"

proTip:
Write one personalized motivational tip.

Return ONLY JSON.
`;


export { learningRoadmap }