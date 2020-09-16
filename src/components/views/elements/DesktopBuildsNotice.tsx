/*
Copyright 2020 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import EventIndexPeg from "../../../indexing/EventIndexPeg";
import { _t } from "../../../languageHandler";
import SdkConfig from "../../../SdkConfig";
import React from "react";

export enum WarningKind {
    Files,
    Search,
}

interface IProps {
    isRoomEncrypted: boolean;
    kind: WarningKind;
}

export default function DesktopBuildsNotice({isRoomEncrypted, kind}: IProps) {
    if (!isRoomEncrypted) return null;
    if (EventIndexPeg.get()) return null;

    const {desktopBuilds, brand} = SdkConfig.get();

    let text = null;
    let logo = null;
    if (desktopBuilds.available) {
        logo = <img src={desktopBuilds.logo} />;
        switch (kind) {
            case WarningKind.Files:
                text = _t("Use the <a>Desktop app</a> to see encrypted files", {}, {
                    a: sub => (<a href={desktopBuilds.url} target="_blank" rel="noreferrer noopener">{sub}</a>),
                });
                break;
            case WarningKind.Search:
                text = _t("Use the <a>Desktop app</a> to search encrypted messages", {}, {
                    a: sub => (<a href={desktopBuilds.url} target="_blank" rel="noreferrer noopener">{sub}</a>),
                });
                break;
        }
    } else {
        switch (kind) {
            case WarningKind.Files:
                text = _t("This version of %(brand)s does not support viewing encrypted files", {brand});
                break;
            case WarningKind.Search:
                text = _t("This version of %(brand)s does not support searching encrypted messages", {brand});
                break;
        }
    }

    // for safety
    if (!text) {
        console.warn("Unknown desktop builds warning kind: ", kind);
        return null;
    }

    return (
        <div className="mx_DesktopBuildsNotice">
            {logo}
            <span>{text}</span>
        </div>
    );
}
