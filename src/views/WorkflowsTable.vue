<!--
Copyright (C) NIWA & British Crown (Met Office) & Contributors.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
-->

<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-row class="align-self-start">
      <v-col>
        <!-- TODO: this is not really an alert, it's a heading -->
        <v-alert
          :icon="$options.icons.mdiTable"
          prominent
          color="grey-lighten-3"
        >
          <h3 class="text-h5">{{ $t('Workflows.tableHeader') }}</h3>
        </v-alert>
        <v-data-table
          :headers="$options.headers"
          :items="workflowsTable"
          data-cy="workflows-table"
          style="font-size: 1rem;"
        >
          <template v-slot:item="{ item }">
            <tr
              @click="viewWorkflow(item)"
              style="cursor: pointer"
            >
              <td width="1em">
                <WorkflowIcon
                  :status="item.node.status"
                  v-command-menu="item"
                />
              </td>
              <td>
                {{ item.tokens.workflow }}
              </td>
              <td>
                {{ item.node.status }}
              </td>
              <td>
                {{ item.node.cylcVersion }}
              </td>
              <td>
                {{ item.node.owner }}
              </td>
              <td>
                {{ item.node.host }}
              </td>
              <td>
                {{ item.node.port }}
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { i18n } from '@/i18n'
import { mdiTable } from '@mdi/js'
import SubscriptionQuery from '@/model/SubscriptionQuery.model'
import subscriptionComponentMixin from '@/mixins/subscriptionComponent'
import WorkflowIcon from '@/components/cylc/gscan/WorkflowIcon.vue'
import gql from 'graphql-tag'

const QUERY = gql`
subscription Workflow {
  deltas {
    id
    added {
      workflow {
        ...WorkflowData
      }
    }
    updated (stripNull: true) {
      workflow {
        ...WorkflowData
      }
    }
    pruned {
      workflow
    }
  }
}

fragment WorkflowData on Workflow {
  id
  status
  cylcVersion
  owner
  host
  port
}
`

export default {
  name: 'WorkflowsTable',

  mixins: [
    subscriptionComponentMixin,
  ],

  components: {
    WorkflowIcon
  },

  data: () => ({
    query: new SubscriptionQuery(
      QUERY,
      {},
      'root',
      [],
      true,
      true
    ),
  }),

  computed: {
    ...mapState('workflows', ['cylcTree']),
    ...mapGetters('workflows', ['getNodes']),
    workflows () {
      return this.getNodes('workflow')
    },
    workflowsTable () {
      return Object.values(this.workflows)
    }
  },

  methods: {
    viewWorkflow (workflow) {
      this.$router.push({ path: `/workspace/${workflow.tokens.workflow}` })
    }
  },

  headers: [
    {
      sortable: false,
      title: '',
      key: 'icon'
    },
    {
      sortable: true,
      title: i18n.global.t('Workflows.tableColumnName'),
      key: 'tokens.workflow'
    },
    {
      sortable: true,
      title: 'Status',
      key: 'node.status'
    },
    {
      sortable: true,
      title: 'Cylc Version',
      key: 'node.cylcVersion'
    },
    {
      sortable: true,
      title: i18n.global.t('Workflows.tableColumnOwner'),
      key: 'node.owner'
    },
    {
      sortable: true,
      title: i18n.global.t('Workflows.tableColumnHost'),
      key: 'node.host'
    },
    {
      sortable: false,
      title: i18n.global.t('Workflows.tableColumnPort'),
      key: 'node.port'
    },
  ],

  icons: {
    mdiTable,
  },
}
</script>
