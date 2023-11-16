import {FC} from "react";
import Cookie from 'js-cookie'

interface BreadcrumbProps {
    pages: string
}

const Breadcrumb: FC<BreadcrumbProps> = ({pages}) => {

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="text-sm font-opensans">
        <ul className="flex flex-row gap-x-2 text-white pl-0 mb-0">
          <li className="opacity-50">
            <a>Pages</a>
          </li>
          <li className="before:content-['/'] before:pr-2 ">{pages}</li>
        </ul>
        <div className="text-white text-base font-semibold">{pages}</div>
      </div>
      <div className="lg:hidden block text-white" onClick={() => Cookie.set('toggle', 'true')}>
        <i className="fa-solid fa-bars"></i>
      </div>
    </div>
  );
};

export default Breadcrumb;
