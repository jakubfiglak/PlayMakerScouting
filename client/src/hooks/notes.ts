import axios from 'axios';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { Note, NoteBasicInfo, NoteDTO, NotesFilterData } from '../types/notes';
import {
  ApiError,
  ApiResponse,
  PaginatedData,
  SortingOrder,
} from '../types/common';
import { useAlertsState } from '../context/alerts/useAlertsState';

// Get all notes with pagination
type PaginatedNotes = PaginatedData<Note>;
type GetNotesResponse = ApiResponse<PaginatedNotes>;
type GetNotesArgs = {
  page?: number;
  limit?: number;
  sort?: string;
  order: SortingOrder;
  filters: NotesFilterData;
};

async function getNotes({
  page = 1,
  limit = 20,
  sort = 'date',
  order,
  filters,
}: GetNotesArgs): Promise<PaginatedNotes> {
  const orderSign = order === 'desc' ? '-' : '';
  const { player, club, match } = filters;

  // Generate query url
  let notesURI = `/api/v1/notes?page=${page}&limit=${limit}&sort=${orderSign}${sort}`;

  if (player) {
    notesURI = notesURI.concat(`&player=${player}`);
  }

  if (club) {
    notesURI = notesURI.concat(`&playerCurrentClub=${club}`);
  }

  if (match) {
    notesURI = notesURI.concat(`&match=${match}`);
  }

  const { data } = await axios.get<GetNotesResponse>(notesURI);
  return data.data;
}

export function useNotes({
  page = 1,
  limit = 20,
  sort = 'date',
  order,
  filters,
}: GetNotesArgs) {
  const { setAlert } = useAlertsState();
  const queryClient = useQueryClient();

  return useQuery<PaginatedNotes, ApiError>(
    ['notes', { page, limit, sort, order, filters }],
    () => getNotes({ page, limit, sort, order, filters }),
    {
      keepPreviousData: true,
      onSuccess: (data) => {
        queryClient.setQueryData('notes', data.docs);
      },
      onError: (err: ApiError) =>
        setAlert({ msg: err.response.data.error, type: 'error' }),
    },
  );
}

// Get notes list
async function getNotesList(): Promise<NoteBasicInfo[]> {
  const { data } = await axios.get<ApiResponse<NoteBasicInfo[]>>(
    '/api/v1/notes/list',
  );
  return data.data;
}

export function useNotesList() {
  const { setAlert } = useAlertsState();

  return useQuery(['notes', 'list'], getNotesList, {
    onError: (err: ApiError) =>
      setAlert({ msg: err.response.data.error, type: 'error' }),
  });
}

// Get single note
async function getNote(id: string): Promise<Note> {
  const { data } = await axios.get<ApiResponse<Note>>(`/api/v1/notes/${id}`);
  return data.data;
}

export function useNote(id: string) {
  const { setAlert } = useAlertsState();
  const queryClient = useQueryClient();

  return useQuery(['notes', id], () => getNote(id), {
    initialData: () => {
      const cacheNotes: Note[] = queryClient.getQueryData('notes') || [];
      return cacheNotes.find((note) => note.id === id);
    },
    onError: (err: ApiError) =>
      setAlert({ msg: err.response.data.error, type: 'error' }),
  });
}

// Create new note
async function createNote(noteData: NoteDTO): Promise<ApiResponse<Note>> {
  const { data } = await axios.post<ApiResponse<Note>>(
    '/api/v1/notes',
    noteData,
  );
  return data;
}

export function useCreateNote() {
  const queryClient = useQueryClient();
  const { setAlert } = useAlertsState();

  return useMutation((values: NoteDTO) => createNote(values), {
    onSuccess: (data) => {
      setAlert({ msg: data.message, type: 'success' });
      queryClient.invalidateQueries('notes');
    },
    onError: (err: ApiError) =>
      setAlert({ msg: err.response.data.error, type: 'error' }),
  });
}

// Update note
type UpdateNoteArgs = { noteId: string; noteData: NoteDTO };

async function updateNote({
  noteId,
  noteData,
}: UpdateNoteArgs): Promise<ApiResponse<Note>> {
  const { data } = await axios.put<ApiResponse<Note>>(
    `/api/v1/notes/${noteId}`,
    noteData,
  );
  return data;
}

export function useUpdateNote(noteId: string) {
  const queryClient = useQueryClient();
  const { setAlert } = useAlertsState();

  return useMutation(
    (values: NoteDTO) => updateNote({ noteId, noteData: values }),
    {
      onSuccess: (data) => {
        setAlert({ msg: data.message, type: 'success' });
        queryClient.invalidateQueries('notes');
      },
      onError: (err: ApiError) =>
        setAlert({ msg: err.response.data.error, type: 'error' }),
    },
  );
}

// Delete note
async function deleteNote(id: string): Promise<ApiResponse<string>> {
  const { data } = await axios.delete<ApiResponse<string>>(
    `/api/v1/notes/${id}`,
  );
  return data;
}

export function useDeleteNote() {
  const queryClient = useQueryClient();
  const { setAlert } = useAlertsState();

  return useMutation((id: string) => deleteNote(id), {
    onSuccess: (data) => {
      setAlert({ msg: data.message, type: 'success' });
      queryClient.invalidateQueries('notes');
    },
    onError: (err: ApiError) =>
      setAlert({ msg: err.response.data.error, type: 'error' }),
  });
}
