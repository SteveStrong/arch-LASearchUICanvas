import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { JwtInterceptor, ErrorInterceptor } from './login';
import { LoginComponent } from './login';
import { RegisterComponent } from './login';

import { ToastrModule } from 'ngx-toastr';
import { AgGridModule } from 'ag-grid-angular';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatExpansionModule } from '@angular/material/expansion';

import { WelcomeComponent } from './welcome/welcome.component';
import { LibraryComponent } from './library/library.component';
import { DirectoryItemComponent } from './library/directory-item.component';
import { ItemHistoryComponent } from './library/item-history.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamMemberComponent } from './teams/team-member.component';
import { TeamComponent } from './teams/team.component';
import { CreateTeamComponent } from './teams/create-team.component';
import { CreateTeamMemberComponent } from './teams/create-team-member.component';
import { TeamMemberDisplayComponent } from './teams/team-member-display.component';
import { WorkspaceComponent } from './library/workspace.component';
import { DirectoryGridComponent } from './library/directory-grid.component';
import { UsersComponent } from './teams/users.component';
import { UserComponent } from './teams/user.component';
import { DrawingComponent } from './drawing/drawing.component';
import { ScenesComponent } from './scenes/scenes.component';

import { SearchAndRenderComponent } from './search-and-render/search-and-render.component';
import { SearchComponent } from './search-and-render/search.component';
import { SearchResultsComponent } from './search-and-render/search-results.component';
import { ListViewComponent } from './search-and-render/list-view.component';
import { CardViewComponent } from './search-and-render/card-view.component';
import { CardSetComponent } from './search-and-render/card-set.component';
import { NotebookComponent } from './search-and-render/notebook.component';
import { ThumbSetComponent } from './search-and-render/thumb-set.component';

import { MarkerComponent } from './marker/marker.component';
import { SentenceComponent } from './marker/sentence.component';
import { AttributeEditorComponent } from './marker/attributeEditorcomponent';
import { ParagraphComponent } from './marker/paragraph.component';
import { PredictionComponent } from './marker/prediction.component';
import { SelectionComponent } from './marker/selection.component';
import { SplitterComponent } from './marker/splitter.component';
import { SentencetypePipe } from './marker/sentencetype.pipe';
import { JoinerComponent } from './marker/joiner.component';
import { ReaderComponent } from './marker/reader.component';
import { CaseTitleComponent } from './marker/case-title.component';
import { SectionBadgeComponent } from './marker/section-badge.component';
import { SearchAdvancedComponent } from './search-and-render/search-advanced.component';

@NgModule({
  declarations: [
    MarkerComponent,
    SentenceComponent,
    AttributeEditorComponent,
    ParagraphComponent,
    PredictionComponent,
    SelectionComponent,
    SplitterComponent,
    SentencetypePipe,
    JoinerComponent,
    ReaderComponent,
    CaseTitleComponent,
    SectionBadgeComponent,
    
    LoginComponent,
    RegisterComponent,
    WelcomeComponent,
    LibraryComponent,
    DirectoryItemComponent,
    ItemHistoryComponent,
    TeamsComponent,
    TeamMemberComponent,
    TeamComponent,
    CreateTeamComponent,
    CreateTeamMemberComponent,
    TeamMemberDisplayComponent,
    WorkspaceComponent,
    DirectoryGridComponent,
    UsersComponent,
    UserComponent,
    DrawingComponent,
    AppComponent,
    ScenesComponent,
    SearchComponent,
    SearchResultsComponent,
    ListViewComponent,
    SearchAndRenderComponent,
    CardViewComponent,
    CardSetComponent,
    NotebookComponent,
    ThumbSetComponent,
    SearchAdvancedComponent
  ],
  imports: [
    // FontAwesomeModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatCardModule,
    MatGridListModule,
    MatExpansionModule,
    MatTabsModule,
    MatStepperModule,
    InfiniteScrollModule,
    BrowserModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
    }),
    AgGridModule.withComponents([]),
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
