import { create } from 'zustand';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  id: string;
}

interface TabState {
  messages: Message[];
  isOpen: boolean;
  lastMessageContent?: string;
}

interface ChatState {
  tabStates: Record<string, TabState>;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  addMessage: (tab: string, content: string, role: 'user' | 'assistant') => void;
  setIsOpen: (tab: string, isOpen: boolean) => void;
  clearMessages: (tab: string) => void;
  initializeTab: (tab: string, initialMessage?: string) => void;
  handleExampleDataLoaded: () => void;
  handleDataReset: () => void;
  handleFieldFocus: (fieldName: string, suggestion: string) => void;
}

const DEFAULT_TAB_STATE: TabState = {
  messages: [],
  isOpen: true,
  lastMessageContent: undefined
};

const generateMessageId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

const getTabWelcomeMessage = (tab: string) => {
  switch (tab) {
    case 'calculator':
      return "Hello! I'm your insurance ROI advisor. Please select your Line of Business from the dropdown menu to get started. This selection is required to provide accurate benchmarks and industry-specific guidance.";
    case 'narrative':
      return "Welcome to the Narrative section! I can help you understand your results in detail. Would you like me to explain:\n\n1. Growth Analysis\n2. Process Improvements\n3. Financial Impact\n\nJust let me know which area interests you.";
    case 'context':
      return "Welcome to the Context section! I can help explain:\n\n1. Industry Benchmarks\n2. Calculation Methods\n3. Key Success Factors\n\nWhat would you like to learn about?";
    default:
      return '';
  }
};

export const useChatStore = create<ChatState>((set) => ({
  tabStates: {},
  currentTab: 'calculator',

  setCurrentTab: (tab: string) => set((state) => {
    if (!state.tabStates[tab]) {
      const welcomeMessage = getTabWelcomeMessage(tab);
      return {
        currentTab: tab,
        tabStates: {
          ...state.tabStates,
          [tab]: {
            ...DEFAULT_TAB_STATE,
            messages: welcomeMessage ? [{
              role: 'assistant',
              content: welcomeMessage,
              id: generateMessageId(),
            }] : [],
            lastMessageContent: welcomeMessage
          },
        },
      };
    }
    return { currentTab: tab };
  }),

  addMessage: (tab: string, content: string, role: 'user' | 'assistant') => 
    set((state) => {
      // Don't add if it's the same as the last message
      if (state.tabStates[tab]?.lastMessageContent === content) {
        return state;
      }

      return {
        tabStates: {
          ...state.tabStates,
          [tab]: {
            ...state.tabStates[tab] || DEFAULT_TAB_STATE,
            messages: [
              ...(state.tabStates[tab]?.messages || []),
              { role, content, id: generateMessageId() },
            ],
            isOpen: true,
            lastMessageContent: content
          },
        },
      };
    }),

  setIsOpen: (tab: string, isOpen: boolean) =>
    set((state) => ({
      tabStates: {
        ...state.tabStates,
        [tab]: {
          ...state.tabStates[tab] || DEFAULT_TAB_STATE,
          isOpen,
        },
      },
    })),

  clearMessages: (tab: string) =>
    set((state) => {
      const welcomeMessage = getTabWelcomeMessage(tab);
      return {
        tabStates: {
          ...state.tabStates,
          [tab]: {
            ...state.tabStates[tab] || DEFAULT_TAB_STATE,
            messages: [{
              role: 'assistant',
              content: welcomeMessage,
              id: generateMessageId(),
            }],
            lastMessageContent: welcomeMessage
          },
        },
      };
    }),

  initializeTab: (tab: string, initialMessage?: string) =>
    set((state) => {
      const message = initialMessage || getTabWelcomeMessage(tab);
      return {
        tabStates: {
          ...state.tabStates,
          [tab]: {
            ...DEFAULT_TAB_STATE,
            messages: [{
              role: 'assistant',
              content: message,
              id: generateMessageId(),
            }],
            lastMessageContent: message
          },
        },
      };
    }),

  handleExampleDataLoaded: () =>
    set((state) => ({
      tabStates: {
        ...state.tabStates,
        calculator: {
          ...state.tabStates.calculator || DEFAULT_TAB_STATE,
          messages: [
            ...(state.tabStates.calculator?.messages || []),
            {
              role: 'assistant',
              content: "I see you've loaded example data. Would you like me to walk you through the results and explain what they mean? I can help you understand:\n\n1. Growth requirements\n2. Process improvements\n3. Financial impact\n\nJust let me know what interests you most!",
              id: generateMessageId(),
            },
          ],
          isOpen: true,
        },
      },
    })),

  handleDataReset: () =>
    set((state) => ({
      tabStates: {
        ...state.tabStates,
        calculator: {
          ...state.tabStates.calculator || DEFAULT_TAB_STATE,
          messages: [
            ...(state.tabStates.calculator?.messages || []),
            {
              role: 'assistant',
              content: "I see you've reset the calculator. Please select your Line of Business from the dropdown menu to begin. This selection is required to provide accurate benchmarks and industry-specific guidance.",
              id: generateMessageId(),
            },
          ],
          isOpen: true,
        },
      },
    })),

  handleFieldFocus: (fieldName: string, suggestion: string) =>
    set((state) => {
      // Don't add if it's the same as the last message
      if (state.tabStates.calculator?.lastMessageContent === suggestion) {
        return state;
      }

      return {
        tabStates: {
          ...state.tabStates,
          calculator: {
            ...state.tabStates.calculator || DEFAULT_TAB_STATE,
            messages: [
              ...(state.tabStates.calculator?.messages || []),
              {
                role: 'assistant',
                content: suggestion,
                id: generateMessageId(),
              },
            ],
            isOpen: true,
            lastMessageContent: suggestion
          },
        },
      };
    }),
}));