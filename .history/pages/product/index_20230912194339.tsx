import { RJSFSchema } from '@rjsf/utils'
import validator from '@rjsf/validator-ajv8'

const schema: RJSFSchema = {
  title: 'Test form',
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    age: {
      type: 'number',
    },
  },
}

export default function Product() {

return (
  <Form schema={schema} validator={validator} />,
  document.getElementById('app')
)
}
