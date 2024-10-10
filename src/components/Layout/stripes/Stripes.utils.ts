import _ from 'lodash';

export const isStripes = neonData => _.get(neonData, 'siteContext.root.attributes.theme') === 'stripes';
