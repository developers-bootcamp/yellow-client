import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { styled, keyframes } from '@mui/system';



const spinAnomation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loader = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
});
const LoaderSpinner = styled('div')({
    border: '4px solid #d8d2d2',
    borderTop: '4px solid #FAE282',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    animation: `${spinAnomation} 1s linear infinite`
});

const GlobalLoader: React.FC = () => {

    const loading: boolean = useSelector<RootState, boolean>((state) => state.loaderReducer.isLoading);
    return (
        <>
            {loading && <Loader>
                <LoaderSpinner></LoaderSpinner>
            </Loader>}
        </>
    )
}
export default GlobalLoader;