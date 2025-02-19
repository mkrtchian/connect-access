import { t, Trans } from "@lingui/macro";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { useStateMachine } from "little-state-machine";
import { useForm } from "react-hook-form";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { PATHS } from "../constants/paths";
import Button from "../forms/buttons/Button";
import Information from "../forms/Information";
import { useGeneratePrefixedPath } from "../hooks";
import type { OrganizationAppRecieved } from "../types/organizationApp";
import { AboutOrganizationFields } from "./fields";
import FormNavigation from "./FormNavigation";
import type { Completed, Step } from "./StepsInitializer";
import type { OrganizationInfo as OrganizationInfoType } from "./updateAction";
import { updateOrganizationInfo } from "./updateAction";

type FormInput = OrganizationInfoType;

type OrganizationInfoProps = RouteComponentProps & {
  /**
   * Indicates the figure of the current displayed form step.
   */
  activeStep: Step;
  /**
   * List of the steps that have been completed, to determine
   * if the user have access to the next step or not.
   */
  completed: Completed;
  /**
   * Function called when tab changing asked by the user and required
   * fields correctly filled. The call will unlock the next step.
   */
  setStepCompleted: () => void;
  /**
   * Wether the focus should be placed on the active tab at init.
   */
  shouldTriggerFocus: boolean;
  /**
   * When true the focus will be placed at the active tab on next render,
   * and the value will be put to false again.
   */
  setShouldTriggerFocus: (shouldTriggerFocus: boolean) => void;
  /**
   * The organization applicaiton data got from the backend for the first time.
   */
  initialOrganizationApp?: OrganizationAppRecieved;
};

/**
 * 3rd step of the main mediation form, to get information on the organization.
 */
function OrganizationInfo({
  history,
  activeStep,
  setStepCompleted,
  completed,
  shouldTriggerFocus,
  setShouldTriggerFocus,
  initialOrganizationApp,
}: OrganizationInfoProps) {
  const { state, actions } = useStateMachine({ updateOrganizationInfo });
  const generatePrefixedPath = useGeneratePrefixedPath();
  const { register, control, errors, trigger, getValues } = useForm<FormInput>({
    defaultValues: state.organizationInfo,
  });
  const onSubmit = (data: FormInput) => {
    actions.updateOrganizationInfo(data);
  };

  const handleClickNext = async () => {
    const isValid = await trigger();
    if (isValid) {
      onSubmit(getValues());
      setStepCompleted();
      history.push(generatePrefixedPath(PATHS.RECAP));
      setShouldTriggerFocus(true);
    }
  };
  const handleClickPrevious = async () => {
    const isValid = await trigger();
    if (isValid) {
      onSubmit(getValues());
      history.push(generatePrefixedPath(PATHS.PROBLEM_DESCRIPTION));
      setShouldTriggerFocus(true);
    }
  };
  const handleChangeTab = async () => {
    const isValid = await trigger();
    if (isValid) {
      onSubmit(getValues());
      return true;
    } else {
      return false;
    }
  };
  return (
    <>
      <FormNavigation
        activeStep={activeStep}
        completed={completed}
        onChangeTab={handleChangeTab}
        shouldTriggerFocus={shouldTriggerFocus}
        setShouldTriggerFocus={setShouldTriggerFocus}
        initialOrganizationApp={initialOrganizationApp}
      />
      <div
        role="tabpanel"
        id="mediation-tabpanel-2"
        aria-labelledby="mediation-tab-2"
        className="mediation-tabpanel mediation-request__form"
      >
        <div className="mediation-tabpanel__title-container">
          <h2 className="mediation-tabpanel__title">
            <Trans>Step 3: The organization</Trans>
          </h2>
        </div>
        <form noValidate className="mediation-tabpanel__form form">
          <Information
            text={t`No field is required. If you have information about the owner of the digital service, you can indicate it, or go to the next step if not.`}
          />
          <AboutOrganizationFields
            register={register}
            errors={errors}
            control={control}
            smallMarginTop={true}
            smallPaddingTop={true}
            level={3}
          />
          <div className="mediation-tabpanel__buttons">
            <Button
              size="large"
              type="button"
              onClick={handleClickPrevious}
              startIcon={<ArrowBackIcon />}
            >
              <Trans>Step 2: Your problem</Trans>
            </Button>
            <Button
              size="large"
              type="button"
              onClick={handleClickNext}
              endIcon={<ArrowForwardIcon />}
            >
              <Trans>Step 4: Summary</Trans>
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

/**
 * Tells if the organization info step is complete or not.
 * @param {object of String} organizationInfoState
 */
export function organizationInfoStepComplete(
  organizationInfoState: OrganizationInfoType
) {
  return true;
}

export default withRouter(OrganizationInfo);
