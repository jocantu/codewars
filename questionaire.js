/**
 * In this short assessment, the following code tries to implement the React Suspense API,
 * but does so incorrectly. There are 3 core issues with how these components utilize Suspense and concurrent mode -- can you find them?
 * 
 * In your submission, be sure to:
 * 1) Clearly identify what the 3 core issues are, and how they violate the principles of React Suspense;
 * 2) Write and submit the code to fix the core issues you have identified in a gist of your own
 * 
 * If you aren't familiar with Suspense, the docs are a good starting place:
 * 
 * https://reactjs.org/docs/concurrent-mode-intro.html
 * 
 * We rate each answer by comparing the submitted answer to how we would write the same code in production at Contra.
 * You are guaranteed an interview if your code ticks all the boxes. Good luck!
 */

 import { Suspense, useState, useEffect } from 'react';

 const SuspensefulUserProfile = ({ userId }) => {
   const [data, setData] = useState({});
   useEffect(() => {
     fetchUserProfile(userId).then((profile) => setData(profile));
   }, [userId, setData])
   return (
     <Suspense>
       <UserProfile data={data} />
     </Suspense>
   );
 };
 const UserProfile = ({ data }) => {
   return (
     <>
       <h1>{data.name}</h1>
       <h2>{data.email}</h2>
     </>
   );
 };
 const UserProfileList = () => (
   <>
     <SuspensefulUserProfile userId={1} />
     <SuspensefulUserProfile userId={2} />
     <SuspensefulUserProfile userId={3} />
   </>
 );
 
 =============================================================================================================================
 
 
 // I've included two solutions because this assessment has dual goals, to both explain the flaws in this Suspense 
 // implementation while also submitting a solution that is close to how Contra would handle production code. I can't
 // really show both in one example, so I've chosen to split them up.
 
 // Solution 1: What's wrong with this implementation of Suspense?
 
 /*
  * 1. Our Suspense has no fallback property to provide a view during data suspension.
  *
  * 2. Data shouldn't be retrieved in the SuspensefulUserProfile component, as that component itself is not wrapped in a
  * suspense. If our data suspends inside SuspensefulUserProfile, there is no suspense above that component in the tree to
  * provide a fallback.
  *
  * 3. We shouldn't be working with useEffect fetching since Suspense enables us to render-as-we-fetch as opposed to
  * fetch-on-render as displayed here. We also shouldn't be using fetch-then-render to resolve a promise to our render
  * state. Because I don't know the use case for this example, I'll include data fetching in the UserProfile component 
  * since that's how we have our Suspense architecture set up, but we should be pre-fetching data as soon as we can in 
  * reality. See the second solution at bottom after break for an example of what I think is a better solution that 
  * negates the use of individual Suspense on UserProfile components.
  */
 
 import { graphql } from 'babel-plugin-relay/macro';
 import { Suspense, SuspenseList } from 'react';
 import { useLazyLoadQuery } from 'react-relay';
 import LoadingUserProfile from '/components/user/LoadingUserProfile';
 
 const UserProfileQuery = graphql`
   query UserProfileQuery($id: Int!) {
     user: user_profile(id: $id) {
       name
       email
     }
   }
 `;
 
 const SuspensefulUserProfile = ({ userId }) => {
   return (
     <Suspense fallback={<LoadingUserProfile />}>
       <UserProfile userId={userId} />
     </Suspense>
   );
 };
 
 const UserProfile = ({ userId }) => {
   const {
     data: { user },
   } = useLazyLoadQuery(UserProfileQuery, { id: userId });
   return (
     <article>
       <h1>{user.name}</h1>
       <h2>{user.email}</h2>
     </article>
   );
 };
 
 const userIds = [1, 2, 3];
 
 const UserProfileList = () => (
   <ul>
     {/* SuspenseList with the revealOrder attribute of 'forwards' makes sure the user profiles load in the
      * list order, thus preventing the UI from displaying tail end components that recieve their data
      * faster than earlier list components. Otherwise, user 3 might load first, forcing user 3 to jump down
      * so user 1 and 2 can have room to load. That would be ugly.
      */}
     <SuspenseList revealOrder="forwards">
       {userIds.map((userId) => (
         <li key={userId} >
           <SuspensefulUserProfile userId={userId} />
         </li>
       ))}
     </SuspenseList>
   </ul>
 );
 
 
 =========================================================================================================================
 
 // Solution 2: How should this code look in a production design paradigm?
 
 /*
  * Solution 1 did some things I didn't like, such as loading individual user profiles with hardcoded search
  * values, then suspending the UserProfile compoenents one at a time. I felt like if I was putting a list of 
  * user profiles into a UI, I wouldn't want them to display individually. So in this use case, we preload a query
  * and batch all the user profiles under a single Suspense of the list and set an error boundary in case of
  * incomplete user information. The ErrorBoundary component also serves to simply remove any elements that error
  * by rendering null so the rest of the list can load
 */
 
 
 import { Suspense, SuspenseList} from 'react';
 import { graphql } from 'babel-plugin-relay/macro';
 import { RelayEnvironmentProvider, loadQuery, usePreloadedQuery } from 'react-relay/hooks';
 import RelayEnvironment from '/RelayEnvironment';
 import LoadingProfileList from '/components/user/LoadingProfileList'; 
 
 /* 
  * With hardcoded values representing user profiles, we can start fetching as soon as the app loads with a preloaded graphql 
  * query linked to our context provided by Relay's runtime environment. 
  */
 
 const UserProfileListQuery = graphql`
   query UserProfileListQuery($ids: [Int!]){
     userProfiles: user_profiles(ids: $ids){
       id
       name
       email
     }
   }
 `;
 
 // Immediately load the query as our app starts. For a real app, we'd move this
 // into our routing configuration, preloading data as we transition to new routes.
 const preloadedQuery = loadQuery(RelayEnvironment, UserProfileListQuery, {
   ids: [1, 2, 3],
 });
 
 // an ErrorBoundary is important in case our Suspense ends in an error or an attempt
 // to access data fails because of a non-existent property
 class ErrorBoundary extends React.Component {
   constructor(props) {
     super(props);
     this.state = { hasError: false };
     this.errorComponent = props.errorComponent
   }
 
   static getDerivedStateFromError(error) {
     // Update state so the next render will show the fallback UI.
     return { hasError: true };
   }
 
   render() {
     if (this.state.hasError) {
       // You can render any custom fallback UI
       return this.errorComponent || null;
     }
 
     return this.props.children; 
   }
 }
 
 const UserProfile = ({ user }) => (
     <ErrorBoundary>
       <li>
         <article>
           <h1>{user.name}</h1>
           <h2>{user.email}</h2>
         </article>
       </li>
     </ErrorBoundary>
   );
 
 
 const UserProfileList = ({ preloadedQuery }) => {
   // usePreloadedQuery takes advantage of the context of RelayEnvironmentProvider
   const { data: { userProfiles }} = usePreloadedQuery(UserProfileListQuery, preloadedQuery);
   return (
   <ul>
      {userProfiles.map(( user )=> <UserProfile key={user.id} user={user} />)}
   </ul>
 )};
 
 
 // RelayEnvironmentProvider would usually be much further up the component tree, but used here to show flow
 const SuspensefulUserProfileList = () => (
   <RelayEnvironmentProvider>
     <ErrorBoundary errorComponent={<h1>Error loading profile list.</h1>}>
       <Suspense fallback={<LoadingProfileList />}>
         <UserProfileList />
       </Suspense>
     </ErrorBoundary>
   </RelayEnvironmentProvider>
 )