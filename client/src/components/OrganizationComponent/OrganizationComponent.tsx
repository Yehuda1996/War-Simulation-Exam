import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrganizations } from '../../store/features/organizationSlice/organization'; 
import { AppDispatch, RootState } from '../../store/store'; 

const OrganizationComponent: React.FC = () => {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();
  
  const organizations = useSelector((state: RootState) => state.organization.organizations);
  const status = useSelector((state: RootState) => state.organization.status);
  const error = useSelector((state: RootState) => state.organization.error);
  
  const { user, token } = useSelector((state: RootState) => state.user);
  
  useEffect(() => {
    if (user && token) {
      // Dispatch the action to fetch organizations with username and token
      dispatch(fetchOrganizations({ username: user.username, token }));
    }
  }, [dispatch, user, token]);

  return (
    <div>
      <h1>Organization: {user?.organization}</h1>
      {status === 'pending' && <p>Loading organization data...</p>}
      {error && <p>Error: {error}</p>}
      {organizations && organizations.length > 0 ? (
        organizations.map((org, index) => (
          <div key={index}>
            <h2>{org.name}</h2>
            <div>
              <h3>Resources:</h3>
              {org.resources.map((resource, resourceIndex) => (
                <p key={resourceIndex}>
                  {resource.name}: {resource.amount}
                </p>
              ))}
            </div>
            <p>Budget: {org.budget}</p>
          </div>
        ))
      ) : (
        <p>No organization data available</p>
      )}
    </div>
  );
};

export default OrganizationComponent;
