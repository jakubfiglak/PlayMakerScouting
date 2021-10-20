import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
// MUI components
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@material-ui/core';
// Custom components
import { TeamsCombo } from '../../components/selects/TeamsCombo';
import { UsersCombo } from '../../components/selects/UsersCombo';
import { MainFormActions } from '../../components/formActions/MainFormActions';
import { FormContainer } from '../../components/FormContainer';
import { ClubsMultipleSelect } from '../../components/selects/ClubsMultipleSelect';
import { PlayersMultipleSelect } from '../../components/selects/PlayersMultipleSelect';
import { MatchesMultipleSelect } from '../../components/selects/MatchesMultipleSelect';
import { NotesMultipleSelect } from '../../components/selects/NotesMultipleSelect';
import { ReportsMultipleSelect } from '../../components/selects/ReportsMultipleSelect';
// Types
import {
  AccessControlList,
  GrantAccessDTO,
  TargetAssetType,
} from '../../types/accessControlLists';
import { UserBasicInfo } from '../../types/users';
import { Team } from '../../types/teams';
import { ClubBasicInfo } from '../../types/clubs';
import { ReportBasicInfo } from '../../types/reports';
import { PlayerBasicInfo } from '../../types/players';
import { MatchBasicInfo } from '../../types/matches';
import { Note } from '../../types/notes';
import { getDisabledOptionsFromAcl } from './utils';

type Props = {
  users: UserBasicInfo[];
  teams: Team[];
  clubs: ClubBasicInfo[];
  reports: ReportBasicInfo[];
  players: PlayerBasicInfo[];
  matches: MatchBasicInfo[];
  notes: Note[];
  accessControlLists: AccessControlList[];
  onSubmit: (data: GrantAccessDTO) => void;
};

export const GrantAccessForm = ({
  users,
  teams,
  clubs,
  reports,
  players,
  matches,
  notes,
  accessControlLists,
  onSubmit,
}: Props) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={(data, { resetForm }) => {
        onSubmit(data);
        resetForm();
      }}
    >
      {({ errors, touched, handleReset, values }) => (
        <Form>
          <FormContainer>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="targetAssetTypeLabel">
                Rodzaj zasobu, któremu chcesz nadać dostęp
              </InputLabel>
              <Field
                as={Select}
                name="targetAssetType"
                labelId="targetAssetTypeLabel"
                id="targetAssetType"
                label="Rodzaj zasobu, któremu chcesz nadać dostęp"
                error={touched.targetAssetType && !!errors.targetAssetType}
              >
                <MenuItem value="user">scout</MenuItem>
                <MenuItem value="team">zespół scoutów</MenuItem>
              </Field>
              {touched.targetAssetType && errors.targetAssetType && (
                <FormHelperText>{errors.targetAssetType}</FormHelperText>
              )}
            </FormControl>
            <FormControl variant="outlined" fullWidth>
              {values.targetAssetType === 'user' ? (
                <UsersCombo
                  id="targetAssetId"
                  usersData={
                    users.filter((user) => user.role !== 'admin') || []
                  }
                  label="Wybierz użytkownika"
                />
              ) : (
                <TeamsCombo
                  name="targetAssetId"
                  teamsData={teams}
                  label="Wybierz zespół"
                />
              )}
            </FormControl>
            <FormControl>
              <ClubsMultipleSelect
                clubs={clubs}
                getDisabledOptions={() =>
                  getDisabledOptionsFromAcl({
                    assetType: 'clubs',
                    targetAssetType: values.targetAssetType,
                    targetAssetId: values.targetAssetId,
                    acls: accessControlLists,
                  })
                }
              />
            </FormControl>
            <FormControl>
              <PlayersMultipleSelect
                players={players}
                getDisabledOptions={() =>
                  getDisabledOptionsFromAcl({
                    assetType: 'players',
                    targetAssetType: values.targetAssetType,
                    targetAssetId: values.targetAssetId,
                    acls: accessControlLists,
                  })
                }
              />
            </FormControl>
            <FormControl>
              <MatchesMultipleSelect
                matches={matches}
                getDisabledOptions={() =>
                  getDisabledOptionsFromAcl({
                    assetType: 'matches',
                    targetAssetType: values.targetAssetType,
                    targetAssetId: values.targetAssetId,
                    acls: accessControlLists,
                  })
                }
              />
            </FormControl>
            <FormControl>
              <NotesMultipleSelect
                notes={notes}
                getDisabledOptions={() =>
                  getDisabledOptionsFromAcl({
                    assetType: 'notes',
                    targetAssetType: values.targetAssetType,
                    targetAssetId: values.targetAssetId,
                    acls: accessControlLists,
                  })
                }
              />
            </FormControl>
            <FormControl>
              <ReportsMultipleSelect
                reports={reports}
                getDisabledOptions={() =>
                  getDisabledOptionsFromAcl({
                    assetType: 'reports',
                    targetAssetType: values.targetAssetType,
                    targetAssetId: values.targetAssetId,
                    acls: accessControlLists,
                  })
                }
              />
            </FormControl>
            <MainFormActions
              label="dostępy"
              isEditState={false}
              onCancelClick={handleReset}
            />
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
};

const initialValues: GrantAccessDTO = {
  targetAssetType: 'user',
  targetAssetId: '',
  clubs: [],
  players: [],
  matches: [],
  notes: [],
  reports: [],
};

export const validationSchema: yup.ObjectSchema<GrantAccessDTO> = yup
  .object({
    targetAssetType: yup
      .mixed<TargetAssetType>()
      .required('Wybierz rodzaj zasobu, któremu chcesz nadać dostęp'),
    targetAssetId: yup
      .string()
      .required('Wybierz zasób, któremu chcesz nadać dostęp'),
    clubs: yup.array<string>().defined(),
    players: yup.array<string>().defined(),
    matches: yup.array<string>().defined(),
    notes: yup.array<string>().defined(),
    reports: yup.array<string>().defined(),
  })
  .defined();
