const questions = [

  // SECTION 1
  { type: "section", title: "LT-1: Enable threat detection capabilities" },

  {
    q: "Are cloud-native threat detection capabilities deployed for compute, storage, database, and identity services?",
    risk: "⚠️ Lack of cloud-native threat detection reduces visibility into active threats across workloads."
  },
  {
    q: "Is Microsoft Defender for Cloud enabled to provide threat detection for all critical Azure services?",
    risk: "⚠️ Unprotected Azure services may allow attacker activity to go undetected."
  },
  // … add up to 10 questions for LT-1

  // SECTION 2
  { type: "section", title: "LT-2: Enable threat detection for identity and access management" },

  {
    q: "Is Microsoft Entra ID Protection enabled to detect identity-based risks?",
    risk: "⚠️ Undetected identity risks increase the likelihood of account compromise."
  },
  // … add 8 questions for LT-2

  // SECTION 3
  { type: "section", title: "LT-3: Enable logging for security investigation" },

  {
    q: "Are Microsoft Entra audit logs enabled for identity resource changes?",
    risk: "⚠️ Missing audit logs prevent investigation of identity-related security incidents."
  },

  // Continue for LT-4 … LT-7
];
