import {Link} from "react-router-dom";
import '../styles/compBuild.css';

const CompBuild = () => {
    const componentList = ['CPU', 'CPU Cooler', 'Motherboard', 'Memory', 'Storage', 'GPU', 'Case', 'Power Supply', 'Operating System', 'Sound Card', 'Monitor', 'Peripherals']
    return (
        <div>
            <h1>Build your computer</h1>
            {componentList.map((component, i) => {
                return <Link className='component-choice-link' to={`/build/${component.toLowerCase()}`} key={i}>{component}</Link>
            })}
        </div>
    );
}

export default CompBuild;