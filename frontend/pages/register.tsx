import { StyledSpanError } from '@/src/components/Modals/Create Advert/style';
import { ButtonBig } from '@/src/components/button-big';
import { Footer } from '@/src/components/footer';
import { Header } from '@/src/components/header';
import { UserContext } from '@/src/contexts/userContext';
import { iFormRegister } from '@/src/interfaces/user';
import { userSchema } from '@/src/schemas/userSchema';
import {
  RegisterStyled,
  StyledAdress,
  StyledCheckbox,
} from '@/src/styles/containers';
import { Body_2_500, Heading_5_500 } from '@/src/styles/global';
import { StyledInput2 } from '@/src/styles/input';
import { StyledLabels } from '@/src/styles/labels';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function Register() {
  const { RegisterUser,
        setisAnnouncement,
        isAnnouncement, } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors},
  } = useForm<iFormRegister>({
    criteriaMode: 'all',
    resolver: yupResolver(userSchema),
  });


  useEffect(()=>{
   var formatedCPF = getValues('cpf')
    formatedCPF = formatedCPF.replace(/\D/g, "");
    formatedCPF = formatedCPF.substring(0, 11);
    formatedCPF = formatedCPF.replace(/(\d{3})(\d)/, "$1.$2")
    formatedCPF = formatedCPF.replace(/(\d{3})(\d)/, "$1.$2")
    formatedCPF = formatedCPF.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
   setValue('cpf', formatedCPF)
  }, [watch('cpf')])

  useEffect(()=>{
    var formatedPhone = getValues('phone')
     formatedPhone = formatedPhone.replace(/\D/g, "");
     formatedPhone = formatedPhone.substring(0, 11);
     formatedPhone = formatedPhone.replace(/(\d{2})(\d)/, "($1) $2")
     formatedPhone = formatedPhone.replace(/(\d{5})(\d)/, "$1-$2")
    setValue('phone', formatedPhone)
   }, [watch('phone')])

   useEffect(()=>{
    var formatedDate = getValues('birth_date')
     formatedDate = formatedDate.replace(/\D/g, "");
     formatedDate = formatedDate.substring(0, 8);
     formatedDate = formatedDate.replace(/(\d{2})(\d)/, "$1/$2")
     formatedDate = formatedDate.replace(/(\d{2})(\d)/, "$1/$2")
     formatedDate = formatedDate.replace(/(\d{4})(\d)/, "$1/$2")
    setValue('birth_date', formatedDate)
   }, [watch('birth_date')])


   useEffect(()=>{
    var formatedCep = getValues('address.cep')
    formatedCep = formatedCep.replace(/\D/g, "");
    formatedCep = formatedCep.substring(0, 8);
    formatedCep = formatedCep.replace(/(\d{5})(\d)/, "$1-$2")
    setValue('address.cep', formatedCep)
   }, [watch('address.cep')])
  return (
    <>
      <Header />
      <RegisterStyled>
        <div className="containerInput">
          <Heading_5_500>Cadastro</Heading_5_500>
          <form onSubmit={handleSubmit(RegisterUser)}>
          <div className="containerInput">
            <Body_2_500>Informações pessoais</Body_2_500>
            <StyledLabels htmlFor="name">Nome</StyledLabels>
            <StyledInput2
              id="name"
              placeholder="Ex: Samuel Leão"
              {...register('name')}
            />
            <StyledSpanError>{errors.name?.message}</StyledSpanError>
          </div>

            <div className="containerInput">
              <StyledLabels htmlFor="email">Email</StyledLabels>
              <StyledInput2
                id="email"
                placeholder="Ex: samuel@email.com"
                {...register('email')}
              />
              <StyledSpanError>{errors.email?.message}</StyledSpanError>
            </div>

            <div className="containerInput">
              <StyledLabels htmlFor="cpf">CPF</StyledLabels>
              <StyledInput2
                id="cpf"
                placeholder="000.000.000-00"
                {...register('cpf')}
              />
              <StyledSpanError>{errors.cpf?.message}</StyledSpanError>
            </div>

            <div className="containerInput">
              <StyledLabels htmlFor="phone">Celular</StyledLabels>
              <StyledInput2
                id="phone"
                placeholder="(00) 90000-0000"
                {...register('phone')}
              />
              <StyledSpanError>{errors.phone?.message}</StyledSpanError>
            </div>

            <div className="containerInput">
              <StyledLabels htmlFor="birth_date">Data de nascimento</StyledLabels>
              <StyledInput2
                id="birth_date"
                placeholder="00/00/0000"
                {...register('birth_date')}
              />
              <StyledSpanError>{errors.birth_date?.message}</StyledSpanError>
            </div>

            <div className="containerInput">
              <StyledLabels htmlFor="description">Descrição</StyledLabels>
              <StyledInput2
                id="description"
                placeholder="Digitar Descrição"
                {...register('description')}
              />
              <StyledSpanError>{errors.description?.message}</StyledSpanError>
            </div>

            <StyledAdress>
              <Body_2_500>Informações de endereço</Body_2_500>
              <StyledLabels htmlFor="cep">CEP</StyledLabels>
              <StyledInput2
                id="cep"
                {...register('address.cep')}
                placeholder="00000.000"
              ></StyledInput2>
              <StyledSpanError>{errors.address?.cep?.message}</StyledSpanError>
  
              <div>
                <div>
                  <StyledLabels htmlFor="state">Estado</StyledLabels>
                  <StyledInput2
                    id="state"
                    {...register('address.state')}
                    placeholder="Digitar estado"
                  ></StyledInput2>
                  <StyledSpanError>{errors.address?.state?.message}</StyledSpanError>
                </div>
                <div>
                  <StyledLabels htmlFor="city">Cidade</StyledLabels>
                  <StyledInput2
                    id="city"
                    {...register('address.city')}
                    placeholder="Digitar cidade"
                  ></StyledInput2>
                  <StyledSpanError>{errors.address?.city?.message}</StyledSpanError>
                </div>
              </div>
              <StyledLabels htmlFor="road">Rua</StyledLabels>
              <StyledInput2
                id="road"
                {...register('address.road')}
                placeholder="Digitar rua"
              ></StyledInput2>
              <StyledSpanError>{errors.address?.road?.message}</StyledSpanError>
              <div>
                <div>
                  <StyledLabels htmlFor="number">Número</StyledLabels>
                  <StyledInput2
                    id="number"
                    {...register('address.number')}
                    placeholder="Digitar numero"
                  ></StyledInput2>
                  <StyledSpanError>{errors.address?.number?.message}</StyledSpanError>
                </div>
                <div>
                  <StyledLabels htmlFor="complement">Complemento</StyledLabels>
                  <StyledInput2
                    id="complement"
                    {...register('address.complement')}
                    placeholder="Digitar complemento"
                  ></StyledInput2>
                  <StyledSpanError>{errors.address?.complement?.message}</StyledSpanError>
                </div>
              </div>
            </StyledAdress>

            <Body_2_500>Tipo de conta</Body_2_500>
            <div>
              <StyledCheckbox type="button"
              onClick={()=>{setisAnnouncement(!isAnnouncement)}}
              style={
                    isAnnouncement
                      ? {
                          backgroundColor: 'var(--color-brand-1)',
                          color: 'var(--color-whiteFixed)',
                        }
                      : {
                          backgroundColor: 'var(--color-whiteFixed)',
                          color: 'var(--color-grey-0)',
                        }
                  }>Anunciante</StyledCheckbox>
              <StyledCheckbox type="button"
                onClick={()=>{setisAnnouncement(!isAnnouncement)}}
                  style={
                        !isAnnouncement
                          ? {
                              backgroundColor: 'var(--color-brand-1)',
                              color: 'var(--color-whiteFixed)',
                            }
                          : {
                              backgroundColor: 'var(--color-whiteFixed)',
                              color: 'var(--color-grey-0)',
                            }
                  }>Comprador</StyledCheckbox>
            </div>

            <div className="containerInput">
              <StyledLabels htmlFor="password">Senha</StyledLabels>
              <StyledInput2
                id="password"
                type="password"
                placeholder="Digitar senha"
                {...register('password')}
              />
              <StyledSpanError>{errors.password?.message}</StyledSpanError>
            </div>

            <div className="containerInput">
              <StyledLabels htmlFor="confim_password">
                Confirmar Senha
              </StyledLabels>
              <StyledInput2
                id="confim_password"
                type="password"
                placeholder="Digitar senha"
                {...register('confim_password')}
              />
              <StyledSpanError>{errors.confim_password?.message}</StyledSpanError>
            </div>

            <ButtonBig
              bgColor="var(--color-brand-1)"
              fontColor="var(--color-whiteFixed)"
              borderColor="var(--color-brand-1)"
              type="submit"
            >
              Finalizar Cadastro
            </ButtonBig>
          </form>
        </div>
      </RegisterStyled>
      <Footer />
    </>
  );
}
