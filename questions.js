const questions = [
  // SECTION 1
  { type: "section", title: "LT-1: Enable threat detection capabilities" },

  {
    q: "Have you deployed the cloud-native threat detection capabilities of your cloud security posture management platform for compute, storage, database, and identity services?",
    risk: "⚠️ Without cloud-native threat detection, attacks on your cloud resources may go unnoticed."
  },
  {
    q: "Have you enabled threat detection for all critical Azure services using Microsoft Defender for Cloud?",
    risk: "⚠️ Critical services without threat detection can be exploited without alerts."
  },
  // ... up to 10 questions for LT-1

  // SECTION 2
  { type: "section", title: "LT-2: Enable threat detection for identity and access management" },

  {
    q: "Have you deployed Microsoft Entra ID Protection to detect identity-based risks?",
    risk: "⚠️ Undetected identity risks increase the likelihood of account compromise."
  },
  // ... up to 8 questions for LT-2

  // SECTION 3
  { type: "section", title: "LT-3: Enable logging for security investigation" },

  {
    q: "Are Microsoft Entra audit logs enabled for identity resource changes?",
    risk: "⚠️ Missing audit logs prevent investigation of identity-related security incidents."
  }

  // Continue LT-4 to LT-7 with the remaining questions
];
