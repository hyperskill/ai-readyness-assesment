// Survey Questions Data
const SURVEY_DATA = {
  categories: [
    {
      id: 'strategy-culture',
      name: 'Strategy & Culture',
      description: 'How intentionally AI is positioned, communicated, and supported for the team.',
      questions: [
        'Leadership regularly communicates to my team why AI matters for the business and for specific roles over the next 12 months.',
        'Leadership and managers have discussed and aligned with the team on which roles AI supports and which roles may change because of AI.',
        'Employees in my team generally feel safe using AI in their daily work without fear of judgment or negative consequences.',
        'Leadership has communicated where and how AI is expected to be used in everyday work, and my team refers to this guidance in practice.',
        'Failed or imperfect AI experiments in the team are usually discussed with a focus on learning rather than blame.'
      ]
    },
    {
      id: 'data-infrastructure',
      name: 'Data, Infrastructure & Governance',
      description: 'How well data, systems, and rules enable the team to use AI responsibly.',
      questions: [
        'My team works with clearly identified data sources that are used in our AI use cases.',
        'The data used by the team for AI is generally clean, up to date, and usable without excessive manual effort.',
        'There are clear rules about which data must not be shared with AI tools, and my team mostly follows them in practice.',
        'AI tools used by the team are connected to data sources through integrations or APIs in most cases, rather than manual copy-paste.',
        'Known infrastructure limitations are explicitly considered when my team decides how and where to use AI.'
      ]
    },
    {
      id: 'tools-automation',
      name: 'Tools & Automation',
      description: 'How consistently AI tools are embedded into the team\'s daily workflows.',
      questions: [
        'AI tools are used regularly as part of my team\'s daily work, not only for one-off experiments.',
        'Team members actively review AI outputs and know when human judgment is required.',
        'My team consciously chooses between AI assistants and more autonomous agents depending on task complexity and risk.',
        'There are recurring tasks where AI saves the team noticeable time on a regular basis.',
        'The team periodically reassesses its AI tool stack and adjusts it as needs and constraints change.'
      ]
    },
    {
      id: 'skills-learning',
      name: 'Skills & Learning',
      description: 'How systematically AI skills are developed and supported within the team.',
      questions: [
        'Required AI skills are defined for different roles in my team, at least at a high level.',
        'Some team members consistently create clear and effective instructions or prompts for AI tools.',
        'New team members are introduced to existing AI practices during onboarding, even if only at a basic level.',
        'AI outputs produced by the team are usually reviewed and validated rather than accepted without checks.',
        'The team has a shared understanding of which AI-related skills are currently missing or underdeveloped.'
      ]
    },
    {
      id: 'product-processes',
      name: 'Product & Processes',
      description: 'How AI contributes to value creation in the team\'s work.',
      questions: [
        'My team can point to specific parts of the product or service where AI creates tangible value.',
        'AI improves not only speed, but also quality or user experience in some of the team\'s core processes.',
        'Processes that require a human-in-the-loop are defined and generally followed by the team.',
        'Changes to workflows caused by AI adoption are documented or explained well enough for the team to follow.',
        'When using AI, the team consciously balances speed, quality, and reliability rather than optimizing for speed alone.'
      ]
    },
    {
      id: 'security-compliance',
      name: 'Security & Compliance',
      description: 'How risks, responsibility, and safeguards are handled in the team\'s usage.',
      questions: [
        'Team members are generally aware of risks related to uncontrolled or careless AI usage.',
        'Rules for safe and compliant AI use exist and are applied by the team in most everyday situations.',
        'Responsibility for decisions and mistakes involving AI is clearly assigned to people, not to tools.',
        'The team\'s AI usage aligns with client expectations, legal requirements, and regulatory constraints.',
        'There is a known process the team can follow to pause, limit, or roll back AI solutions if issues arise.'
      ]
    },
    {
      id: 'experimentation-innovation',
      name: 'Experimentation & Innovation',
      description: 'How structured and intentional AI experimentation is within the team.',
      questions: [
        'AI experiments run by the team are usually framed as hypotheses with a clear expected outcome.',
        'Most AI experiments have a defined timeframe and some criteria for success or failure.',
        'Failed AI experiments are reviewed by the team and lead to concrete learnings.',
        'The team has some protected time or space to experiment with AI alongside delivery work.',
        'The team consciously decides which AI experiments to scale further and which to stop.'
      ]
    },
    {
      id: 'integration-scaling',
      name: 'Integration & Scaling',
      description: 'How reliably the team\'s AI solutions can be sustained and expanded.',
      questions: [
        'AI solutions used by the team do not depend on a single individual to operate or evolve.',
        'Successful AI solutions from the team can be reused or adapted by other teams with reasonable effort.',
        'AI solutions are maintained by the team after launch, not only during initial rollout.',
        'The team has a reasonable understanding of what currently limits further AI scaling.',
        'AI initiatives fit into the broader system and architecture the team works within, rather than existing as isolated add-ons.'
      ]
    },
    {
      id: 'impact-measurement',
      name: 'Impact Measurement',
      description: 'How clearly the team measures and prioritizes AI impact.',
      questions: [
        'Success metrics are defined for AI initiatives before or shortly after the team starts them.',
        'The team can point to concrete improvements that are largely attributable to AI usage.',
        'The team distinguishes between local efficiency gains and broader business impact.',
        'AI initiatives involving the team are prioritized and resourced alongside other projects based on expected value.',
        'Leadership is willing to stop AI initiatives involving the team if they do not deliver meaningful results over time.'
      ]
    }
  ]
};

// Likert Scale Options
const LIKERT_SCALE = [
  { value: 1, label: '1', description: 'Strongly disagree' },
  { value: 2, label: '2', description: 'Disagree' },
  { value: 3, label: '3', description: 'Neutral' },
  { value: 4, label: '4', description: 'Agree' },
  { value: 5, label: '5', description: 'Strongly agree' }
];

// AI Maturity Level Descriptions
const LEVEL_DESCRIPTIONS = {
  'AI-Curious': 'Your team is clearly interested in AI and already exploring its potential, but most initiatives are still informal and driven by individual enthusiasm. This is a healthy starting point: curiosity means there is energy and openness to change. At the same time, the lack of shared language, clear priorities, and agreed rules creates a risk that efforts will stay fragmented and hard to scale. The main opportunity at this stage is to align the team around what AI means for your work, where it should be used, and what "good" looks like before moving deeper into technical implementation.',
  
  'AI-Enabled': 'Your team has moved beyond curiosity and already applies AI in real tasks and pilots. Some practices work well, and there are visible wins. However, AI usage is still uneven: different people and sub-teams use it in different ways, and results depend heavily on individual skills. This stage is about turning isolated successes into repeatable practices. With clearer standards, shared tooling approaches, and explicit expectations, your team can reduce friction and prepare for more ambitious AI initiatives.',
  
  'AI-Driven': 'AI is already part of how your team operates and delivers results. You are not just experimenting — you are integrating AI into products, processes, or workflows and seeing measurable impact. The key challenge at this level is reliability and scale: making sure solutions are robust, maintainable, and understandable by the whole team. Strengthening engineering discipline, evaluation, and ownership will help ensure that AI remains a long-term advantage rather than a source of hidden complexity.',
  
  'AI-Native': 'AI is deeply embedded in your team\'s strategy, culture, and technical systems. Decisions about tools, processes, and architecture naturally include AI considerations, and the team treats AI as a core capability rather than an add-on. At this level, the focus shifts from adoption to leadership: refining platforms, sharing best practices, and continuously improving how AI is governed and evolved. Your main opportunity is to stay intentional and disciplined as you scale, ensuring that maturity does not turn into complacency.'
};

// Product Recommendations
const PRODUCT_DESCRIPTIONS = {
  'AI foundations training': {
    name: 'AI foundations training',
    description: 'Your assessment results suggest that the main challenge right now is alignment rather than technology. Your team is curious about AI and already experimenting, but there is no shared language yet around what AI is, where it should be used, and what good usage looks like. This is a very common and healthy stage.',
    why: 'AI foundations training gives your cross-functional team a common mental model of LLMs, agents, and AI workflows. Instead of relying on individual intuition, the team learns to reason about AI in the same way and make decisions together.',
    change: 'After the program, discussions about AI become clearer, experiments feel safer, and your team can move forward without internal friction or uncertainty about basic concepts.'
  },
  
  'AI engineering training': {
    name: 'AI engineering training',
    description: 'Your team is already actively working with AI and exploring product-level use cases. The ambition is there, but the results show gaps in engineering depth: data readiness, evaluation, deployment, and long-term maintenance. This usually means that prototypes appear quickly, but scaling them becomes stressful and unpredictable.',
    why: 'AI engineering training focuses on the full lifecycle of AI-based products. It helps your engineers move from experiments to production-ready systems with clear ownership, testing, monitoring, and metrics.',
    change: 'Within a few months, your team will be able to build AI-powered solutions that are not only impressive demos, but stable, debuggable, and ready to support real users and business processes.'
  },
  
  'AI-driven software development workshops': {
    name: 'AI-driven software development workshops',
    description: 'Your results indicate a mature engineering team that already understands AI fundamentals. The main opportunity now is to integrate AI more deeply into everyday development workflows: coding, reviews, maintenance, and quality control.',
    why: 'The workshops are short, focused, and hands-on. They work directly with your team\'s real code and processes, showing how coding agents, pull-request workflows, and AI-assisted maintenance can speed up delivery without sacrificing quality.',
    change: 'You should see immediate productivity gains and more consistent use of AI across the team, without the overhead of a long training program or a full reset of existing practices.'
  }
};
