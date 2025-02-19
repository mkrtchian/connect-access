import { t, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import { generatePath, Link, useParams } from "react-router-dom";
import { statusMap } from "../constants/choicesMap";
import Button from "../forms/buttons/Button";
import Table from "../forms/Table";
import type { MediationRequest } from "../types/mediationRequest";

type MediationRequestsListProps = {
  mediationRequests: MediationRequest[];
  /**
   * The path to get the mediation request detail pages.
   */
  detailsPath: string;
};

/**
 * List mediation requests within a table.
 */
function MediationRequestsList({
  mediationRequests,
  detailsPath,
}: MediationRequestsListProps) {
  const { organizationSlug, applicationSlug } =
    useParams<{ organizationSlug: string; applicationSlug: string }>();
  const { i18n } = useLingui();

  const headsInfos = [
    { text: t`Date` },
    { text: t`Organization` },
    { text: t`Problem Description` },
    { text: t`Status` },
    { text: t`Identifier` },
    { text: t`Details` },
  ];
  const rowsInfos = mediationRequests.map((request) => {
    const creationDate = new Date(
      request.creationDate ? request.creationDate : 0
    );
    return {
      key: request.id ? request.id : "undefined",
      infos: [
        { text: creationDate.toLocaleString(i18n.locale) },
        { text: request.organizationName },
        { text: request.issueDescription },
        {
          text: <Trans id={statusMap[request.status]} />,
        },
        {
          text: request.id ? request.id.substring(0, 8) : "Unknown ID",
        },
        {
          text: (
            <>
              {" "}
              <Button
                size="small"
                component={Link}
                to={generatePath(detailsPath, {
                  requestId: request.id,
                  organizationSlug,
                  applicationSlug,
                })}
                startIcon={<ZoomInIcon />}
              >
                <Trans>Details</Trans>
              </Button>
            </>
          ),
        },
      ],
    };
  });

  return (
    <Table
      captionText={t`Your mediation requests' list sorted by date`}
      className="admin-trace-reports"
      headsInfos={headsInfos}
      rowsInfos={rowsInfos}
    />
  );
}

export default MediationRequestsList;
