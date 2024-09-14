import { useNavigate, useLocation } from 'react-router-dom';

/**
 * useRelativeRouteNavigation is a reusable function to navigate to a relative route.
 * @param {string} relativePath - The relative path you want to navigate to.
 * @param {object} [options] - Optional navigation options like `replace` and `state`.
 */
const useRelativeRouteNavigation = (relativePath, options = {}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = () => {
    // Calculate the full path relative to the current location
    const newPath = `${location.pathname}/${relativePath}`.replace(/\/+/g, '/'); // Avoid double slashes

    // Navigate to the new relative route
    navigate(newPath, options);
  };

  return handleNavigation;
};

export { useRelativeRouteNavigation };