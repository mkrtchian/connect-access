import { useParams } from "react-router-dom";
import useSWR from "swr";
import type {
  AboutService,
  AboutServiceRecieved,
  ContactInformation,
  ContactInformationRecieved,
} from "../types/footerConfiguration";
import { MediationRequest } from "../types/mediationRequest";
import type {
  OrganizationApp,
  OrganizationAppRecieved,
} from "../types/organizationApp";
import { UserDetails } from "../types/userDetails";
import { keysToCamel } from "../utils";
import { fetcher } from "./fetcher";
import useSwrWithStorage from "./useSwrWithStorage";

type UseUserMediationRequestsReturn = {
  userMediationRequests?: MediationRequest[];
  userMediationRequestsError: unknown;
};

/**
 * Return up to date mediation requests, handling calls to the backend,
 * and storing in local storage for offline use.
 * @param token the authentication token to make the query.
 * @returns data and error if any.
 */
function useUserMediationRequests(
  token?: string
): UseUserMediationRequestsReturn {
  const { data, error } = useSwrWithStorage<MediationRequest[]>(
    "/api/mediation-requests/user/",
    token,
    true
  );
  return {
    userMediationRequests: data,
    userMediationRequestsError: error,
  };
}

type UseUserDetailsReturn = {
  userDetails?: UserDetails;
  userDetailsError: unknown;
};

/**
 * Return up to date user details, handling calls to the backend,
 * and storing in local storage for offline use.
 * @param token the authentication token to make the query.
 * @returns data and error if any.
 */
function useUserDetails(token?: string): UseUserDetailsReturn {
  const { data, error } = useSwrWithStorage<UserDetails>(
    "/auth/users/me/",
    token,
    true
  );
  return {
    userDetails: data,
    userDetailsError: error,
  };
}

type UseOrganizationAppReturn = {
  organizationApp: OrganizationApp;
  organizationAppError: unknown;
  mutateOrganizationApp: (
    data?: any,
    shouldRevalidate?: boolean
  ) => Promise<any>;
};

/**
 * Return the current organization application details.
 * @param {object} the initial organization application
 *   data sent by the backend. Can be null.
 * @returns data and error if any, and a function to mutate the data.
 */
function useOrganizationApp(
  initialOrganizationApp?: OrganizationAppRecieved
): UseOrganizationAppReturn {
  const { organizationSlug, applicationSlug } = useParams<{
    organizationSlug: string;
    applicationSlug: string;
  }>();
  const { data, error, mutate } = useSWR<OrganizationAppRecieved>(
    Boolean(organizationSlug && applicationSlug)
      ? `/api/organizations/${organizationSlug}/applications/${applicationSlug}/`
      : null,
    fetcher,
    { initialData: initialOrganizationApp }
  );
  return {
    organizationApp: keysToCamel(data) as OrganizationApp,
    organizationAppError: error,
    mutateOrganizationApp: mutate,
  };
}

type UseFooterAboutServiceReturn = {
  footerAboutService: AboutService[];
  footerAboutServiceError: unknown;
};

/**
 * Return footer links in the "about" category.
 *
 * @returns data and error if any.
 */
function useFooterAboutService(): UseFooterAboutServiceReturn {
  const { data, error } = useSWR<AboutServiceRecieved[]>(
    "/api/configuration/about-service/",
    fetcher
  );
  return {
    footerAboutService: keysToCamel(data) as AboutService[],
    footerAboutServiceError: error,
  };
}

type UseFooterContactInformationReturn = {
  footerContactInformation: ContactInformation;
  footerContactInformationError: unknown;
};

/**
 * Return footer contact information.
 *
 * @returns data and error if any.
 */
function useFooterContactInformation(): UseFooterContactInformationReturn {
  const { data, error } = useSWR<ContactInformationRecieved>(
    "/api/configuration/contact-information/",
    fetcher
  );
  return {
    footerContactInformation: keysToCamel(data) as ContactInformation,
    footerContactInformationError: error,
  };
}

export {
  useUserMediationRequests,
  useUserDetails,
  useOrganizationApp,
  useFooterAboutService,
  useFooterContactInformation,
};
