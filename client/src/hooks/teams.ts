import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AddMemberDTO, DeleteMemberDTO, Team, TeamDTO } from '../types/teams';
import { ApiError, ApiResponse } from '../types/common';
import { useAlertsState } from '../context/alerts/useAlertsState';

// Get all teams
async function getTeams(): Promise<Team[]> {
  const { data } = await axios.get<ApiResponse<Team[]>>('/api/v1/teams');
  return data.data;
}

export function useTeams() {
  const { setAlert } = useAlertsState();

  return useQuery<Team[], ApiError>('teams', getTeams, {
    onError: (err: ApiError) =>
      setAlert({ msg: err.response.data.error, type: 'error' }),
  });
}

// Get single team
async function getTeam(id: string): Promise<Team> {
  const { data } = await axios.get<ApiResponse<Team>>(`/api/v1/teams/${id}`);
  return data.data;
}

export function useTeam(id: string) {
  const queryClient = useQueryClient();
  const { setAlert } = useAlertsState();

  return useQuery<Team, ApiError>(['team', id], () => getTeam(id), {
    initialData: () => {
      const cacheTeams: Team[] = queryClient.getQueryData('teams') || [];
      return cacheTeams.find((team) => team.id === id);
    },
    onError: (err: ApiError) =>
      setAlert({ msg: err.response.data.error, type: 'error' }),
  });
}

// Create team
async function createTeam(teamData: TeamDTO): Promise<ApiResponse<Team>> {
  const { data } = await axios.post<ApiResponse<Team>>(
    '/api/v1/teams',
    teamData,
  );
  return data;
}

export function useCreateTeam() {
  const queryClient = useQueryClient();
  const { setAlert } = useAlertsState();

  return useMutation((values: TeamDTO) => createTeam(values), {
    onSuccess: (data: ApiResponse<Team>) => {
      setAlert({ msg: data.message, type: 'success' });
      queryClient.invalidateQueries('teams');
    },
    onError: (err: ApiError) =>
      setAlert({ msg: err.response.data.error, type: 'error' }),
  });
}

// Delete team
async function deleteTeam(id: string): Promise<ApiResponse<string>> {
  const { data } = await axios.delete<ApiResponse<string>>(
    `api/v1/teams/${id}`,
  );
  return data;
}

export function useDeleteTeam() {
  const queryClient = useQueryClient();
  const { setAlert } = useAlertsState();

  return useMutation((id: string) => deleteTeam(id), {
    onSuccess: (data: ApiResponse<string>) => {
      setAlert({ msg: data.message, type: 'success' });
      queryClient.invalidateQueries('teams');
    },
    onError: (err: ApiError) =>
      setAlert({ msg: err.response.data.error, type: 'error' }),
  });
}

// Add new member to a team
type AddMemberArgs = { addMemberData: AddMemberDTO; teamId: string };

async function addMember({
  addMemberData,
  teamId,
}: AddMemberArgs): Promise<ApiResponse<Team>> {
  const { data } = await axios.patch<ApiResponse<Team>>(
    `/api/v1/teams/${teamId}/add-member`,
    addMemberData,
  );
  return data;
}

export function useAddMember(teamId: string) {
  const queryClient = useQueryClient();
  const { setAlert } = useAlertsState();

  return useMutation(
    (values: AddMemberDTO) => addMember({ addMemberData: values, teamId }),
    {
      onSuccess: (data: ApiResponse<Team>) => {
        setAlert({ msg: data.message, type: 'success' });
        queryClient.invalidateQueries(['team', teamId]);
      },
      onError: (err: ApiError) =>
        setAlert({ msg: err.response.data.error, type: 'error' }),
    },
  );
}

// Delete a member from a team
type DeleteMemberArgs = { deleteMemberData: DeleteMemberDTO; teamId: string };

async function deleteMember({
  deleteMemberData,
  teamId,
}: DeleteMemberArgs): Promise<ApiResponse<Team>> {
  const { data } = await axios.patch<ApiResponse<Team>>(
    `/api/v1/teams/${teamId}/remove-member`,
    deleteMemberData,
  );
  return data;
}

export function useDeleteMember(teamId: string) {
  const queryClient = useQueryClient();
  const { setAlert } = useAlertsState();

  return useMutation(
    (values: DeleteMemberDTO) =>
      deleteMember({ deleteMemberData: values, teamId }),
    {
      onSuccess: (data: ApiResponse<Team>) => {
        setAlert({ msg: data.message, type: 'success' });
        queryClient.invalidateQueries(['team', teamId]);
      },
      onError: (err: ApiError) =>
        setAlert({ msg: err.response.data.error, type: 'error' }),
    },
  );
}
