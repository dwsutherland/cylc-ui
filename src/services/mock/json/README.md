# Mock data for Cylc UI

The files in this directory include:

- `*.json` these a [json-server](https://github.com/typicode/json-server) database
  files. For each of these, when exported, you should have an entry in the `/db`
  endpoint.
- `index.cjs` this is a JS module that exports the imported JSON files. The names
  used in the export section drive the value that appears in the `json-server`
  endpoints (see `/db` to inspect what values are available).

## Introspection query

The following query is a combination of the request generated by
GraphiQL, combined with extra information for the `mutationType`
(instead of just `name`, we ask for `...FullType`).

```graphql
query IntrospectionQuery {
  __schema {
    queryType {
      ...FullType
      __typename
    }
    mutationType {
      ...FullType
      __typename
    }
    subscriptionType {
      name
      __typename
    }
    types {
      ...FullType
      __typename
    }
    directives {
      name
      description
      locations
      args {
        ...InputValue
        __typename
      }
      __typename
    }
  }
}

fragment FullType on __Type {
  kind
  name
  description
  fields(includeDeprecated: true) {
    name
    description
    args {
      ...InputValue
      __typename
    }
    type {
      ...TypeRef
      __typename
    }
    isDeprecated
    deprecationReason
    __typename
  }
  inputFields {
    ...InputValue
    __typename
  }
  interfaces {
    ...TypeRef
    __typename
  }
  enumValues(includeDeprecated: true) {
    name
    description
    isDeprecated
    deprecationReason
    __typename
  }
  possibleTypes {
    ...TypeRef
    __typename
  }
  __typename
}

fragment InputValue on __InputValue {
  name
  description
  type {
    ...TypeRef
    __typename
  }
  defaultValue
  __typename
}

fragment TypeRef on __Type {
  kind
  name
  ofType {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
```
