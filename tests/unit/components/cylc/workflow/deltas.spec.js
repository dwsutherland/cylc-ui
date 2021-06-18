/**
 * Copyright (C) NIWA & British Crown (Met Office) & Contributors.
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

import { expect } from 'chai'
import applyWorkflowDeltas from '@/components/cylc/workflow/deltas'
import WorkflowState from '@/model/WorkflowState.model'

describe('Workflow component', () => {
  let lookup
  let newWorkflow
  beforeEach(() => {
    lookup = {}
    newWorkflow = {
      id: 'cylc|test',
      status: WorkflowState.PAUSED
    }
  })
  describe('Deltas', () => {
    describe('Added', () => {
      it('should apply added deltas', () => {
        const data = {
          deltas: {
            added: {
              workflow: newWorkflow
            }
          }
        }
        applyWorkflowDeltas(data, lookup)
        expect(lookup[newWorkflow.id]).to.deep.equal(newWorkflow)
      })
    })
    describe('Updated', () => {
      it('should apply updated deltas', () => {
        const data = {
          deltas: {
            added: {
              workflow: newWorkflow
            }
          }
        }
        applyWorkflowDeltas(data, lookup)
        expect(lookup[newWorkflow.id].status).to.equal(WorkflowState.PAUSED)
        newWorkflow.status = WorkflowState.STOPPED
        const updateData = {
          deltas: {
            updated: {
              updated: newWorkflow
            }
          }
        }
        applyWorkflowDeltas(updateData, lookup)
        expect(lookup[newWorkflow.id].status).to.equal(WorkflowState.STOPPED)
      })
      it('should create/add when the item updated is not in the lookup yet', () => {
        const data = {
          deltas: {
            updated: {
              workflow: newWorkflow
            }
          }
        }
        applyWorkflowDeltas(data, lookup)
        expect(lookup[newWorkflow.id].status).to.equal(WorkflowState.PAUSED)
      })
    })
    describe('Pruned', () => {
      it('should apply pruned deltas', () => {
        const data = {
          deltas: {
            added: {
              workflow: newWorkflow
            }
          }
        }
        applyWorkflowDeltas(data, lookup)
        expect(lookup[newWorkflow.id]).to.deep.equal(newWorkflow)
        const prunedData = {
          deltas: {
            pruned: {
              workflow: newWorkflow.id
            }
          }
        }
        applyWorkflowDeltas(prunedData, lookup)
        expect(lookup[newWorkflow.id]).to.equal(undefined)
      })
    })
  })
})
