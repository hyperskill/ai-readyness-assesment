// Survey Questions Data
const SURVEY_DATA = {
  categories: [
    {
      id: 'strategy-culture',
      name: 'Strategy & Culture',
      description: 'How clear and aligned is your team on why, where, and how AI should be used.',
      questions: [
        'We can clearly explain why AI matters for our team next year.',
        'We understand which roles AI will support and which may change.',
        'Using AI is seen as normal work practice, not as cheating.',
        'We have agreed where AI use is expected, not optional.',
        'Failed AI experiments do not lead to blame or punishment.'
      ]
    },
    {
      id: 'data-infrastructure',
      name: 'Data & Infrastructure',
      description: 'Whether your data and systems are ready to support AI usage reliably and securely.',
      questions: [
        'We know which data is needed for our AI use cases.',
        'Our data is clean and up to date enough for AI use.',
        'We clearly know which data must not be shared with AI tools.',
        'We can connect AI tools to our data without manual copy-paste.',
        'We understand current infrastructure limits and work within them.'
      ]
    },
    {
      id: 'tools-automation',
      name: 'Tools & Automation',
      description: 'How well AI tools are integrated into daily workflows and where they add real value.',
      questions: [
        'AI tools are part of our daily workflow.',
        'We know when AI helps and when it can mislead us.',
        'We clearly distinguish between AI assistants and autonomous agents.',
        'We have tasks where AI already saves significant time.',
        'We regularly review and update our AI tool stack.'
      ]
    },
    {
      id: 'skills-learning',
      name: 'Skills & Learning',
      description: 'Whether your team has the skills needed to use AI effectively and knows where gaps exist.',
      questions: [
        'We know which AI skills are needed for each role in the team.',
        'Some team members can clearly and precisely give tasks to AI.',
        'New hires are introduced to our AI practices during onboarding.',
        'We know the difference between using AI and checking its output.',
        'We clearly see which AI skills we are missing today.'
      ]
    },
    {
      id: 'product-processes',
      name: 'Product & Processes',
      description: 'How AI impacts product quality, user experience, and core business processes.',
      questions: [
        'We can point to where AI creates real value in our product or service.',
        'AI improves not only speed but also quality or user experience.',
        'We know which processes require a human in the loop.',
        'AI-driven process changes are documented and explained.',
        'We consciously balance speed and reliability when using AI.'
      ]
    },
    {
      id: 'security-compliance',
      name: 'Security & Compliance',
      description: 'Whether risks are understood, rules are clear, and responsibility is defined.',
      questions: [
        'The team understands risks of uncontrolled AI usage.',
        'We have clear rules on what data can and cannot be used with AI.',
        'Responsibility for AI mistakes is clearly defined.',
        'Our AI usage does not violate client or regulatory requirements.',
        'We know how to quickly stop or roll back harmful AI solutions.'
      ]
    },
    {
      id: 'experimentation-innovation',
      name: 'Experimentation & Innovation',
      description: 'How deliberately your team runs AI experiments and learns from them.',
      questions: [
        'We define AI experiments with clear expected outcomes.',
        'Experiments have time limits and success criteria.',
        'Failed experiments still produce useful learning.',
        'The team has dedicated time for AI experimentation.',
        'We know which experiments to scale and which to stop.'
      ]
    },
    {
      id: 'integration-scaling',
      name: 'Integration & Scaling',
      description: 'Whether AI solutions can be reused, maintained, and scaled beyond prototypes.',
      questions: [
        'AI solutions do not depend on a single key person.',
        'We can reuse AI solutions across teams with little effort.',
        'AI solutions are maintained after launch.',
        'We understand what currently blocks AI scaling.',
        'AI initiatives fit into our overall system architecture.'
      ]
    },
    {
      id: 'impact-measurement',
      name: 'Impact Measurement',
      description: 'How rigorously you measure AI results and make data-driven decisions about investments.',
      questions: [
        'We define success metrics before starting AI initiatives.',
        'We can show which improvements came specifically from AI.',
        'We distinguish team-level gains from business-level impact.',
        'AI initiatives compete for resources like any other project.',
        'We are ready to stop AI projects that do not deliver value.'
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
