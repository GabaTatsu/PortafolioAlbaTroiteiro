import WorksList from '../../components/WorksList';
import useWorks from '../../hooks/useWorks';
import NewWorkForm from '../../components/NewWorkForm';
import Spinner from '../../components/Spinner';
import circo from '../../assets/gifs/circo_0.gif';
import './style.css';

const Works = () => {
    const { works, deleteWork, reorder, adWork, loading, setLoading } =
        useWorks({ workType: '1' });

    return (
        <>
            <div className="circo">
                <img src={circo} alt="Circo"></img>
            </div>

            {loading && <Spinner />}
            <NewWorkForm works={works} adWork={adWork}></NewWorkForm>
            <WorksList
                works={works}
                deleteWork={deleteWork}
                reorder={reorder}
                setLoading={setLoading}
            />
        </>
    );
};

export default Works;
