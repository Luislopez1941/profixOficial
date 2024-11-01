import React from 'react';
import './styles/Card.css';
import Link from 'next/link';

// Define la interfaz para los elementos Skill
interface Skill {
    name: string;
}

// Define la interfaz para el objeto 'item'
interface Item {
    image: string;
    fullname: string;
    skills: Skill[];
    starts: number[]; // Esto representa las estrellas, cada número sería una estrella
}

// Define la interfaz de los props que se pasarán al componente Card
interface CardProps {
    item: Item;
    route: string
}

const Card: React.FC<CardProps> = ({ item, route }) => {
    return (
        <div className='card'>
            <div className='card__container'>
                <div
                    className='card__image'
                    style={{ backgroundImage: `url(${item.image})` }}
                ></div>
                <div className='card__content'>
                    <div>
                        <p className='name'>{item.fullname}</p>
                    </div>
                    <div>
                        <p className='reviews'>Me gusta ofrecer servicios de calidad</p>
                    </div>
                    <div className='qualifications'>
                        <div className='score'>
                            <small>8.9</small>
                        </div>
                        <div className='text__title'>
                            <small>muy bueno</small>
                        </div>
                        <div className='starts'>
                            {item.starts.map((_, index) => (
                                <div key={index}>
                                    <svg  xmlns="http://www.w3.org/2000/svg" color='#F2A541'  width="20"  height="20"  viewBox="0 0 24 24"  fill="currentColor"  className="icon icon-tabler icons-tabler-filled icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" /></svg>
                                    {/* <Star
                                        style={{
                                            width: '1rem',
                                            height: '1rem',
                                            color: '',
                                        }}
                                    /> */}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='skills'>
                        {item.skills.map((skill, skillIndex) => (
                            <p className={skill.name} key={skillIndex}>
                                {skill.name}
                            </p>
                        ))}
                    </div>
                    <div className='btn'>
                        <Link href={route}>Ver perfil</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
