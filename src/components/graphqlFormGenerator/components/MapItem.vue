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

<!-- Form input component for "key = value" pair -->

<template>
  <v-row
    class="c-key-val my-1"
    no-gutters
  >
    <v-col cols="5">
      <div>
        <v-text-field
          placeholder="key"
          v-model="modelValue.key"
          :disabled="modelValue.frozenKey"
          class="c-input-key"
          v-bind="{ ...$attrs, ...$options.textFieldProps }"
        />
        <v-tooltip v-bind="tooltipProps">
          <span><code>{{ modelValue.key }}</code><br/>(Pre-existing settings cannot be renamed)</span>
        </v-tooltip>
      </div>
    </v-col>
    <v-col cols="auto" style="display: inline-block; padding-top: 0.5em;">
      <span>=</span>
    </v-col>
    <v-col>
      <v-textarea
        rows="1"
        auto-grow
        placeholder="value"
        v-model="modelValue.value"
        class="c-input-val"
        v-bind="{ ...$attrs, ...$options.textFieldProps }"
      />
    </v-col>
    <v-col cols="auto">
      <slot
        name="append"
        :disabled="modelValue.frozenKey"
      />
      <v-tooltip v-bind="tooltipProps">
        <span>Pre-existing settings cannot be removed</span>
      </v-tooltip>
    </v-col>
  </v-row>
</template>

<script>
import { formElement } from '@/components/graphqlFormGenerator/mixins'

export default {
  name: 'g-map-item',

  mixins: [
    formElement
  ],

  inheritAttrs: false,

  computed: {
    tooltipProps () {
      return {
        location: 'top',
        disabled: !this.modelValue.frozenKey,
        openDelay: 400
      }
    }
  },

  textFieldProps: {
    hideDetails: true
  }
}
</script>
