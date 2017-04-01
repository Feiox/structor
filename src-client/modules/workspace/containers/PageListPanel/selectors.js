/*
 * Copyright 2017 Alexander Pustovalov
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {forOwn, uniq} from 'lodash';
import { createStructuredSelector, createSelector } from 'reselect';
import {pagesSelector, currentPageSelector} from 'modules/workspace/containers/DeskPage/selectors';

export const selectedRoutesSelector = state => state.pageListPanel.selectedRoutes;

export const selectedPagesSelector = createSelector(
    pagesSelector,
    selectedRoutesSelector,
    (pages, selectedRoutes) => {
        let result = [];
        pages = pages || [];
        let filteredPages;
        forOwn(selectedRoutes, (value, prop) => {
            if (value === true) {
                filteredPages = pages.filter(page => page.pagePath === prop);
                if (filteredPages && filteredPages.length > 0) {
                    result = result.concat(filteredPages);
                }
            }
        });
        return result;
    }
);

export const modelSelector = createStructuredSelector({
    selectedRoutes: state => state.pageListPanel.selectedRoutes,
    pages: pagesSelector,
    currentPage: currentPageSelector,
});
