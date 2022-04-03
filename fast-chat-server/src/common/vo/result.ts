import { RCode } from '../constant/rcode';
export interface Result {
  code: RCode;
  msg?: string;
  data?: any;
}
