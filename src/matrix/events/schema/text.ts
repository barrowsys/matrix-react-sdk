/*
Copyright 2021 The Matrix.org Foundation C.I.C.

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

import {UnstableValue} from "../../NamespacedValue";
import {MMessagePart} from "./message";

export const MText = new UnstableValue("m.text", "org.matrix.msc1767.text");
export const MHtml = new UnstableValue("m.html", "org.matrix.msc1767.html");

export type MText = typeof MText;
export type MHtml = typeof MHtml;

export type MTextContent = string | MMessagePart;
export type MHtmlContent = MTextContent; // it's the same, thankfully