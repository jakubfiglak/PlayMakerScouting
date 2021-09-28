import axios from 'axios';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { Note, NoteBasicInfo, NoteDTO, NotesFilterData } from '../types/notes';
import {
  ApiError,
  ApiResponse,
  GetPaginatedDataArgs,
  PaginatedData,
  RatingDescription,
} from '../types/common';
import { useAlertsState } from '../context/alerts/useAlertsState';
import {
  getCreateSuccessMessage,
  getDeleteSuccessMessage,
  getErrorMessage,
  getUpdateSuccessMessage,
} from './utils';

type PaginatedNotes = PaginatedData<Note>;
type GetNotesResponse = ApiResponse<PaginatedNotes>;
type GetNotesArgs = GetPaginatedDataArgs & { filters: NotesFilterData };
type GetPlayersNotesArgs = GetPaginatedDataArgs & { playerId: string };
type GetMatchesNotesArgs = GetPaginatedDataArgs & { matchId: string };

// Get all notes with pagination
function getQueryStringFromRating(rating: RatingDescription) {
  switch (rating) {
    case 'negative':
      return '&percentageRating[gte]=0&percentageRating[lte]=25';
    case 'unknown':
      return '&percentageRating[gt]=25&percentageRating[lte]=50';
    case 'observe':
      return '&percentageRating[gt]=50&percentageRating[lte]=75';
    case 'positive':
      return '&percentageRating[gt]=75';
    default:
      return '';
  }
}

async function getNotes({
  page = 1,
  limit = 20,
  sort = 'date',
  order,
  filters,
}: GetNotesArgs): Promise<PaginatedNotes> {
  const orderSign = order === 'desc' ? '-' : '';
  const { player, club, match, rating, position, createdBy } = filters;

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

  if (rating !== 'all') {
    notesURI = notesURI.concat(getQueryStringFromRating(rating));
  }

  if (position) {
    notesURI = notesURI.concat(`&positionPlayed=${position}`);
  }

  if (createdBy !== 'all') {
    notesURI = notesURI.concat(`&author=${createdBy}`);
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
        setAlert({
          msg: getErrorMessage(err.response.data.error),
          type: 'error',
        }),
    },
  );
}

// Get all notes for a player with pagination
async function getPlayersNotes({
  playerId,
  page = 1,
  limit = 20,
  sort = '_id',
  order,
}: GetPlayersNotesArgs): Promise<PaginatedNotes> {
  const orderSign = order === 'desc' ? '-' : '';
  const notesURI = `/api/v1/players/${playerId}/notes?page=${page}&limit=${limit}&sort=${orderSign}${sort}`;

  const { data } = await axios.get<GetNotesResponse>(notesURI);
  return data.data;
}

export function usePlayersNotes({
  playerId,
  page = 1,
  limit = 20,
  sort = '_id',
  order,
}: GetPlayersNotesArgs) {
  const { setAlert } = useAlertsState();

  return useQuery<PaginatedNotes, ApiError>(
    ['notes', { playerId }, { page, limit, sort, order }],
    () => getPlayersNotes({ playerId, page, limit, sort, order }),
    {
      keepPreviousData: true,
      onError: (err: ApiError) =>
        setAlert({
          msg: getErrorMessage(err.response.data.error),
          type: 'error',
        }),
    },
  );
}

// Get all notes for a match with pagination
async function getMatchesNotes({
  matchId,
  page = 1,
  limit = 20,
  sort = '_id',
  order,
}: GetMatchesNotesArgs): Promise<PaginatedNotes> {
  const orderSign = order === 'desc' ? '-' : '';
  const notesURI = `/api/v1/matches/${matchId}/notes?page=${page}&limit=${limit}&sort=${orderSign}${sort}`;

  const { data } = await axios.get<GetNotesResponse>(notesURI);
  return data.data;
}

export function useMatchesNotes({
  matchId,
  page = 1,
  limit = 20,
  sort = '_id',
  order,
}: GetMatchesNotesArgs) {
  const { setAlert } = useAlertsState();

  return useQuery<PaginatedNotes, ApiError>(
    ['notes', { matchId }, { page, limit, sort, order }],
    () => getMatchesNotes({ matchId, page, limit, sort, order }),
    {
      keepPreviousData: true,
      onError: (err: ApiError) =>
        setAlert({
          msg: getErrorMessage(err.response.data.error),
          type: 'error',
        }),
      enabled: matchId !== '',
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
      setAlert({
        msg: getErrorMessage(err.response.data.error),
        type: 'error',
      }),
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
      setAlert({
        msg: getErrorMessage(err.response.data.error),
        type: 'error',
      }),
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
      setAlert({
        msg: getCreateSuccessMessage({
          type: 'notatkę',
          name: `nr ${data.data.docNumber}`,
        }),
        type: 'success',
      });
      queryClient.invalidateQueries('notes');
    },
    onError: (err: ApiError) =>
      setAlert({
        msg: getErrorMessage(err.response.data.error),
        type: 'error',
      }),
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
        setAlert({
          msg: getUpdateSuccessMessage({
            type: 'notatkę',
            name: `nr ${data.data.docNumber}`,
          }),
          type: 'success',
        });
        queryClient.invalidateQueries('notes');
      },
      onError: (err: ApiError) =>
        setAlert({
          msg: getErrorMessage(err.response.data.error),
          type: 'error',
        }),
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
      setAlert({
        msg: getDeleteSuccessMessage({ type: 'notatkę', id: data.data }),
        type: 'success',
      });
      queryClient.invalidateQueries('notes');
    },
    onError: (err: ApiError) =>
      setAlert({
        msg: getErrorMessage(err.response.data.error),
        type: 'error',
      }),
  });
}
