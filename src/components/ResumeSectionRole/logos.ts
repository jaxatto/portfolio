import ActBlueLogo from '@assets/logos/actblue-logo.svg';
import AlbertsonsLogo from '@assets/logos/albertsons-logo.svg';
import IndeedLogo from '@assets/logos/indeed-logo.svg';
import FireHydrantLogo from '@assets/logos/firehydrant-logo.svg';
import RoutableLogo from '@assets/logos/routable-logo.svg';
import ServiceNowLogo from '@assets/logos/servicenow-logo.svg';
import VisaLogo from '@assets/logos/visa-logo.svg';

const logos: Record<string, React.FC<React.SVGProps<SVGSVGElement>> | undefined> = {
  actblue: ActBlueLogo,
  albertsons: AlbertsonsLogo,
  indeed: IndeedLogo,
  firehydrant: FireHydrantLogo,
  routable: RoutableLogo,
  servicenow: ServiceNowLogo,
  visa: VisaLogo,
};

export default logos;