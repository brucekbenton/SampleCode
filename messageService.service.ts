import {  Injectable  } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { WorkItem, WorkItemState, StatusActivity } from '../workItemService/workItem.service';

import { ServiceOffering } from '../provider/provider.service';
//import { WorkItemState, StatusActivity } from '../networkDesigner.enum';



// Declare an enum defining supported message types
export enum MessageType{
  // Load a new component instance
  LoadComponent=1,
  // remove a specific component instance
  RemoveComponent,
  // Make the specified component the active module in the application
  ActivateComponent,
  // Activate a specific tab in the applet bar
  ActivateTab,
  // Update the standard control button state. This includes hover message and enable state for each button
  UpdateButtonState,
  // TBD
  SaveRecord,
  // TBD
  SubmitRecord,
  // TBD
  AddNewRequest,
  // Declare a message to indicate that the provider data hase been loaded
  ProviderDataLoaded,
  // Declare a message to indicate the current user
  
}

export class ApplicationMessage{
  messageType:MessageType;
  workItem? : WorkItem;
}



@Injectable() export class MessageService{
  private subject = new Subject<any>();

  sendMessage(message: ApplicationMessage){
    this.subject.next({msg:message});
  }

//  sendLoadMessage(command:String){
//    this.subject.next({msg:command});
//  }

  getMessage():Observable<any>{
    return this.subject.asObservable();
  }

  /** ******************************************************************************************
   * @name: getQueryParameter
   * 
   * @author: Bruce Benton
   * 
   * @description: Extract the next query parameter message from the passed in string
   * 
   * @param {string} queryParam - Contains the aggregate query parameter string for the current work item
   * @param {number} startIndex - Specify the starting index in the string to extract a parameter
   * @param {string} paramLabel - Specify the label for the parameter you are attempting to load
   * @returns {string} result - Contains the extracted string
   * @memberof MessageService
   *  *****************************************************************************************/
  getQueryParameter(queryParam : string, startIndex : number,paramLabel:string) :string{
      let result : string="";
      // extract the paraemeter string after the label
      result=queryParam.substring(startIndex+paramLabel.length+1);

      return(result);
  }
}