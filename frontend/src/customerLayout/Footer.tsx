import { Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useFooterAboutService, useFooterContactInformation } from "../hooks";
import LogoBPI from "../images/buildSvg/LogoBpiFrance";
import LogoIDF from "../images/buildSvg/LogoRegionIleDeFrance";
import type { Langs } from "../types/types";

/**
 * Footer content with different pages.
 */
function Footer() {
  const { footerAboutService } = useFooterAboutService();
  const { footerContactInformation } = useFooterContactInformation();
  const { i18n } = useLingui();
  return (
    <footer
      role="contentinfo"
      id="footer"
      className="customer-layout__footer footer"
    >
      <div className="footer__links">
        <div className="footer__link-column">
          <h1 className="footer__title">
            <Trans>Contact us</Trans>
          </h1>
          <ul className="footer__list">
            {footerContactInformation &&
              footerContactInformation.phoneNumber &&
              footerContactInformation.phoneNumber[i18n.locale as Langs] && (
                <li>
                  <Trans>Phone number:</Trans>{" "}
                  <a
                    href={`tel:${
                      footerContactInformation.phoneNumber[i18n.locale as Langs]
                    }`}
                  >
                    {footerContactInformation.phoneNumberText
                      ? footerContactInformation.phoneNumberText[
                          i18n.locale as Langs
                        ]
                      : footerContactInformation.phoneNumber[
                          i18n.locale as Langs
                        ]}
                  </a>
                </li>
              )}
            {footerContactInformation &&
              footerContactInformation.email &&
              footerContactInformation.email[i18n.locale as Langs] && (
                <li>
                  <Trans>
                    <span lang="en">E-mail:</span>
                  </Trans>{" "}
                  <a
                    href={`mailto:${
                      footerContactInformation.email[i18n.locale as Langs]
                    }`}
                  >
                    {footerContactInformation.emailText
                      ? footerContactInformation.emailText[i18n.locale as Langs]
                      : footerContactInformation.email[i18n.locale as Langs]}
                  </a>
                </li>
              )}
            {footerContactInformation &&
              footerContactInformation.website &&
              footerContactInformation.website[i18n.locale as Langs] && (
                <li>
                  <Trans>
                    <span lang="en">Website:</span>
                  </Trans>{" "}
                  <a
                    href={`mailto:${
                      footerContactInformation.website[i18n.locale as Langs]
                    }`}
                  >
                    {footerContactInformation.websiteText
                      ? footerContactInformation.websiteText[
                          i18n.locale as Langs
                        ]
                      : footerContactInformation.website[i18n.locale as Langs]}
                  </a>
                </li>
              )}
          </ul>
        </div>
        <div className="footer__link-column">
          <h1 className="footer__title">
            <Trans>About</Trans>
          </h1>
          <ul className="footer__list">
            {footerAboutService &&
              footerAboutService.map(function displayListItem(element) {
                return (
                  <li key={element.id}>
                    <a
                      href={element.linkUrl[i18n.locale as Langs]}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {element.linkText[i18n.locale as Langs]}
                    </a>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="footer__link-column">
          <h1 className="footer__title">
            <Trans>Utilization</Trans>
          </h1>
          <ul className="footer__list">
            <li>
              <Trans>Help</Trans>
            </li>
            <li>
              <Trans>Sitemap</Trans>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__sponsors">
        <p className="footer__sponsors-text">
          <Trans>Project funded as part of the Innov'Up experimentation</Trans>
        </p>
        <div className="footer__logoBPI">
          <LogoBPI height="100%" />
        </div>
        <div className="footer__logoIDF">
          <LogoIDF height="100%" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
