"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useStateStore } from "../store/state";
import { INPUT_PROPS, inputPropsSchema } from "../dtos";
import { enqueueRender } from "../actions/enqueue-render";
import { toast } from "@sendshorts/ui/sonner";
import { Button } from "@sendshorts/ui/button";
import RenderProgress from "./RenderProgress";
import { Badge } from "@sendshorts/ui/badge";
import Link from "next/link";
import { ExternalLinkIcon } from "lucide-react";

export default function Render() {
  const state = useStateStore((state) => state);

  // optimistic
  const [isRendering, setIsRendering] = useState(false);

  const [isValid, setIsValid] = useState(false);

  const { renderHasErrored, renderedSuccessfully } = useMemo(
    () => ({
      renderHasErrored: state.ui.data.renderStatus === "errored",
      renderedSuccessfully: state.ui.data.renderStatus === "ready",
    }),
    [state.ui.data.renderStatus]
  );

  const requestRender = useCallback(async () => {
    try {
      setIsRendering(true);
      const result = inputPropsSchema.safeParse({
        hook: state.hook.data,
        captions: state.captions.data,
        footage: state.footage.data,
      });
      if (result.success) {
        // we can safely assert types.
        await enqueueRender({
          videoId: state.ui.data.videoId!,
          inputProps: {
            hook: state.hook.data,
            captions: state.captions.data as INPUT_PROPS["captions"],
            footage: state.footage.data as INPUT_PROPS["footage"],
          },
        });
        // order is important: processing start, after job is queueud.
        state.ui.updateField("renderStatus", "processing");
      } else {
        toast.error("Could not render, invalid data.");
      }
    } catch {
      toast.error("Render could not be started.");
    } finally {
      setIsRendering(false);
    }
  }, [state.captions.data, state.footage.data, state.hook.data, state.ui]);

  // custom validation to slighly resemble a form validation.
  useEffect(() => {
    const result = inputPropsSchema.safeParse({
      hook: state.hook.data,
      captions: state.captions.data,
      footage: state.footage.data,
    });
    if (result.success) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [state.hook.data, state.captions.data, state.footage.data]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center p-2">
        <div className="w-[120px]">
          {state.ui.data.renderStatus == "processing" && (
            <RenderProgress videoId={state.ui.data.videoId!} />
          )}
          {renderHasErrored && (
            <Badge variant="destructive" className="text-xs">
              Render Failed
            </Badge>
          )}
        </div>

        <div className="flex space-x-2">
          {renderHasErrored && <Button variant="outline">Re-Try</Button>}
          {renderedSuccessfully && (
            <Button variant={"outline"}>
              <div className="flex items-center space-x-2">
                <Link href={state.ui.data.videoUrl ?? ""} target="_blank">
                  Download
                </Link>
                <ExternalLinkIcon />
              </div>
            </Button>
          )}

          <Button
            onClick={requestRender}
            disabled={!isValid || renderHasErrored}
            loading={state.ui.data.renderStatus == "processing" || isRendering}
          >
            Render
          </Button>
        </div>
      </div>
    </div>
  );
}
