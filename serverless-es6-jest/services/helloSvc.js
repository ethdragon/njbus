import { getUrl } from '../lib/njbus';

export const helloSvc = ({name}) => {
    let url = getUrl(163, 12231);
    return {
        message: `Hello ${name}! Your function executed successfully`,
        url
    }
};
