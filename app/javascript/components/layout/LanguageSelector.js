import React from "react";
import clsx from "clsx";
import { connect } from "react-redux";
import { Dropdown } from "react-bootstrap";
// import { metronic, toAbsoluteUrl } from "../../../_metronic";
import * as i18nLang from '../../store/modules/i18n'
import HeaderDropdownToggle from "./HeaderDropdownToggle";


const languages = [
  {
    lang: "ja",
    name: "日本語",
    flag: "/media/flags/063-japan.svg"
  },
  {
    lang: "en",
    name: "English",
    flag: "/media/flags/226-united-states.svg"
  },
  {
    lang: "zh",
    name: "中文(简体)",
    flag: "/media/flags/034-china.svg"
  },
];

class LanguageSelector extends React.Component {
  render() {
    const { lang, iconType, setLanguage } = this.props;
    const currentLanguage = languages.find(x => x.lang === lang);
    return (
      <Dropdown
        className="kt-header__topbar-item kt-header__topbar-item--langs"
        drop="down" alignRight
      >
        <Dropdown.Toggle as={HeaderDropdownToggle} id="dropdown-toggle-my-cart">
          <span
            className={clsx("kt-header__topbar-icon", {
              "kt-header__topbar-icon--brand": iconType === "brand"
            })}
          >
            <span className="kt-nav__link-icon">
              <img src={currentLanguage.flag} alt={currentLanguage.name} />
            </span>
            <span className="kt-nav__link-text">{currentLanguage.name}</span>
          </span>
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround">
          <ul className="kt-nav">
            {languages.map(language => (
              <li
                key={language.lang}
                className={clsx("kt-nav__item", {
                  "kt-nav__item--active": language.lang === currentLanguage.lang
                })}
              >
                <span
                  onClick={() => {
                    setLanguage(language.lang);
                    this.setState({ open: false });
                    setTimeout(()=> window.location.reload(), 400);
                  }}
                  className={clsx("kt-nav__link", {
                    "kt-nav__link--active":
                      language.lang === currentLanguage.lang
                  })}
                >
                  <span className="kt-nav__link-icon">
                    <img src={language.flag} alt={language.name} />
                  </span>
                  <span className="kt-nav__link-text">{language.name}</span>
                </span>
              </li>
            ))}
          </ul>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

const mapStateToProps = ({ i18n }) => ({ lang: i18n.lang });

export default connect(
  mapStateToProps,
  i18nLang.actions
)(LanguageSelector);
