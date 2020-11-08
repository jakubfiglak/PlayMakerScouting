export type AssignPlaymakerRoleData = {
  user: string;
};

export type State = {
  loading: boolean;
  error: string | null;
  message: string | null;
  setLoading: () => void;
  clearErrors: () => void;
  clearMessage: () => void;
  assignPlaymakerRole: (data: AssignPlaymakerRoleData) => void;
};

export type Action =
  | { type: 'SET_LOADING' }
  | { type: 'CLEAR_ERRORS' }
  | { type: 'CLEAR_MESSAGE' }
  | { type: 'USERS_ERROR'; payload: string }
  | {
      type: 'ASSIGN_ROLE_SUCCESS';
      payload: { message: string };
    };
