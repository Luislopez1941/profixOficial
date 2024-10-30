"use client";

import React from 'react';
import './Main.css';
import items from './json/items.json';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from '../general/Card';
import Slider from "react-slick";
import { Search, Check, CreditCard, ChevronDown } from 'lucide-react';
import { Wrench, Zap, Key, Sparkles, Scissors, PaintBucket, Hammer, Smartphone } from "lucide-react";



interface Skill {
    name: string;
}

interface Item {
    image: string;
    fullname: string;
    skills: Skill[];
    starts: number[];
}

const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

const services = [
    { name: "Plomero", Icon: Wrench },
    { name: "Electricista", Icon: Zap },
    { name: "Cerrajero", Icon: Key },
    { name: "Limpiador", Icon: Sparkles },
    { name: "Jardinero", Icon: Scissors },
    { name: "Pintor", Icon: PaintBucket },
    { name: "Albañil", Icon: Hammer },
    { name: "Técnico en electrodomésticos", Icon: Smartphone },
  ];
  
  interface ServiceCardProps {
    name: string;
    Icon: React.ElementType;
  }

const ServiceCard: React.FC<ServiceCardProps> = ({ name, Icon }) => (
    <div className="service-card">
      <div className="icon-container">
        <Icon className="icon" />
      </div>
      <p>{name}</p>
    </div>
  );

const Main = () => {
    return (
        <div className='main'>
            <div className='row__four'>
                <div>
                    <div className='left'>
                        <p>Recuerda que puedes calificar a profesionales para reconocer su trabajo</p>
                    </div>

                    <div className='right'>
                        <div className='icon-left'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" stroke-linejoin="round" className="lucide lucide-map-pin-house"><path d="M15 22a1 1 0 0 1-1-1v-4a1 1 0 0 1 .445-.832l3-2a1 1 0 0 1 1.11 0l3 2A1 1 0 0 1 22 17v4a1 1 0 0 1-1 1z"/><path d="M18 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 .601.2"/><path d="M18 22v-3"/><circle cx="10" cy="10" r="3"/></svg>
                        </div>
                        <div className='content-right'>
                            <p className='title'>Servicios a Domicilio</p>
                            <p className='text-content'>Servicios de excelente calidad a la puerta de tu domicilio</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row__one'>
                {/* <div className="slider-container">
                    <Slider {...settings}>
                        {items.map((item: Item, index: number) => (
                            <div className='item' key={index}>
                                <Card item={item} />
                            </div>
                        ))}
                    </Slider>
                </div> */}
               <div className="service-professionals">
                    <div className="container">
                        <div className="services-grid">
                        {services.map((service, index) => (
                            <ServiceCard key={index} name={service.name} Icon={service.Icon} />
                        ))}
                        </div>
                    </div>
                    </div>
                <div className='best__services'>

                </div>
            </div>
            <div className='row__two'>
                <div>
                    <div className='left'>
                        <p>En nuestro sitio, te ofrecemos un mundo de posibilidades para todas tus necesidades.</p>
                    </div>
                    <div className='right'>
                        <h2>¡Descubre la Excelencia en Servicios!</h2>
                        <p>En nuestro sitio, te ofrecemos un mundo de posibilidades para todas tus necesidades.</p>
                        <div>
                            Desde plomería hasta electricidad, puedes encontrar una amplia gama de profesionales listos para ayudarte.
                            Lo mejor de todo: cada servicio que ofrecemos es <strong>100% seguro</strong> y <strong>confiable</strong>.

                            ¡Tu satisfacción es nuestra prioridad!
                        </div>
                    </div>
                </div>
            </div>
            <div className='row__three'>
                <div className="how-it-works">
                    <h2 className="title">Cómo funciona ProFix</h2>
                    <div className="steps">
                        <div className="step">
                            <div className="icon search">
                                <Search size={24} />
                            </div>
                            <div className="content">
                                <h3>Búsqueda simple</h3>
                                <p>Usa nuestra barra de búsqueda para encontrar el servicio doméstico que necesitas, o navega por nuestras categorías.</p>
                            </div>
                        </div>
                        <div className="step">
                            <div className="icon check">
                                <Check size={24} />
                            </div>
                            <div className="content">
                                <h3>Selección simple</h3>
                                <p>Elige el servicio adecuado basándote en calificaciones, nivel de experiencia y comentarios.</p>
                            </div>
                        </div>
                        <div className="step">
                            <div className="icon card">
                                <CreditCard size={24} />
                            </div>
                            <div className="content">
                                <h3>Pago fácil</h3>
                                <p>Contrata a tu profesional de confianza de manera fácil y segura. Pagos protegidos, comunicación directa y servicios puntuales.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row__five'>
                <div className='additional__information'>
                    <p>Profesionales comprometidos en alta calidad y confiables.</p>
                    <div>
                        <button className='learn-more'>Aprende más</button>
                    </div>
                </div>
            </div>
            <div className='row__six'>
                <div className=''>
                    <div className='img__services'>

                    </div>
                    <div className='content'>
                        <p className='title'>Mejores servcios domesticos</p>
                        <p>Garantizamos que todos nuestros serviisos sean de calidad</p>
                    </div>
                </div>
            </div>
            <div className='row__seven'>
                <div>
                    <p>Preguntas frecuentes</p>
                </div>
                <div className='item'>
                    <p>¿Por qué debería contratar a un freelancer?</p>
                    <ChevronDown absoluteStrokeWidth />
                </div>
                <div className='item'>
                    <p>¿Cómo sé que voy a recibir el trabajo por el cual pagué?</p>
                    <ChevronDown absoluteStrokeWidth />
                </div>
                <div className='item'>
                    <p>¿A quién debo dirigirme si tengo problemas con un pedido o con un freelancer?</p>
                    <ChevronDown absoluteStrokeWidth />
                </div>
                <div className='item'>
                    <p>¿También puedo trabajar con freelancers de habla español?</p>
                    <ChevronDown absoluteStrokeWidth />
                </div>
            </div>
        </div>
    );
}

export default Main;
