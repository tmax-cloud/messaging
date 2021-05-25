import { TextContent } from '../../../content/types'
import { TextRenderer } from '../../base/renderers/text'
import { VonageContext } from '../context'

export class VonageTextRenderer extends TextRenderer {
  renderText(context: VonageContext, payload: TextContent): void {
    context.messages.push({ content: { type: 'text', text: payload.text as string } })
  }
}
