/**
 * Copyright (C) Earth Sciences New Zealand & British Crown (Met Office) & Contributors.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// Code related to GraphiQL

import { createGraphiQLFetcher } from '@graphiql/toolkit'
import { createGraphQLUrls } from '@/graphql/index'
import { getXSRFHeaders } from '@/utils/urls'

/**
 * Creates a unified GraphiQL fetcher supporting queries, mutations,
 * and modern graphql-transport-ws subscriptions natively.
 *
 * @param {import('graphql-ws').Client} subscriptionsClient
 * @returns {Function} GraphiQL compatible fetcher
 */
export const createGraphiqlFetcher = function (subscriptionsClient) {
  const { httpUrl } = createGraphQLUrls()

  return createGraphiQLFetcher({
    url: httpUrl,
    fetch: (input, init) => {
      // Inject standard custom XSRF headers & credentials needed by Cylc
      const modifiedInit = {
        ...init,
        credentials: 'include',
        headers: {
          ...init?.headers,
          ...getXSRFHeaders(),
        },
      }
      return fetch(input, modifiedInit)
    },
    // Pass the graphql-ws client to native handler
    wsClient: subscriptionsClient,
  })
}
