import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'CssInjectorApplicationCustomizerStrings';

const LOG_SOURCE: string = 'CssInjectorApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ICssInjectorApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class CssInjectorApplicationCustomizer
  extends BaseApplicationCustomizer<ICssInjectorApplicationCustomizerProperties> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    const head: any = document.getElementsByTagName("head")[0] || document.documentElement;
    let customStyle: HTMLLinkElement = document.createElement("link");
    customStyle.href = this.context.pageContext.site.absoluteUrl+"/SiteAssets/cdn/customCSS.css";
    customStyle.rel = "stylesheet";
    customStyle.type = "text/css";
    head.insertAdjacentElement("beforeEnd", customStyle);

    return Promise.resolve();
  }
}
