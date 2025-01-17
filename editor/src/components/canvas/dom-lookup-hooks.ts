import * as React from 'react'
import { WindowPoint } from '../../core/shared/math-utils'
import { useRefEditorState } from '../editor/store/store-hook'
import { CanvasPositions } from './canvas-types'
import { windowToCanvasCoordinates } from './dom-lookup'

export function useWindowToCanvasCoordinates(): (screenPoint: WindowPoint) => CanvasPositions {
  const canvasStateRef = useRefEditorState((store) => store.editor.canvas)
  return React.useCallback(
    (screenPoint: WindowPoint) => {
      return windowToCanvasCoordinates(
        canvasStateRef.current.scale,
        canvasStateRef.current.roundedCanvasOffset,
        screenPoint,
      )
    },
    [canvasStateRef],
  )
}
