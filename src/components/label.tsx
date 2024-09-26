// import { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import Loader from 'src/components/Loader';
// import { IUiConfigurations } from 'src/constants/commonInterfaces';
// import {
//   useGetOperatingLicenseDetailsByIdQuery,
//   useLazyDownloadFileQuery,
// } from 'src/services/landService';
// import { lt } from 'src/utils/cssPrefix';
// import ButtonGroup from 'ui/ButtonGroup';
// import CommonButton from 'ui/CommonButton';
// import { base64Download, getDropDownValue, getHomePath } from 'ui/Commonutils';
// import PageTitle from 'ui/PageTitle';
// import TaskManagement from 'ui/TaskManagement';
// import { useGetInterfaceByIDQuery } from 'ui/hostApiServices';
// import useLanguage from 'ui/useLanguage';
// import {
//   DownloadSimple,
//   File,
//   CalendarBlank,
//   Hash,
//   CaretCircleUp,
//   CaretCircleDown,
// } from '@phosphor-icons/react';
// import { Card, Tag } from 'antd';
// import OperatingLicenseStepper from './OperatingLicenseStepper';
// import Accordion from 'ui/Accordion';
// import Attachments from 'ui/Attachments';
// import RenderLabelAndValue from 'ui/RenderLabelAndValue';
// import useSubTransportActivity from 'src/hooks/useSubTransportActivity';
// import SectionHeader from 'ui/SectionHeader';
// import AEDValue from 'ui/AEDValue';
// import { MOEI_LAND_OPERATING_LICENCE } from 'src/constants/attachmentConstants';
// import Modal from 'ui/Modal';
// import Docviewer from 'ui/Docviewer';
// import ShowMapMarker from 'ui/ShowMapMarker';

// import DateComponent from 'ui/DateComponent';
// import OwnershipDetails from './OwnershipDetails';
// import { IOwnershipDetail } from './OperatingLicensce.dto';
// import { TransportActivity } from './OperatingLicensceForm';
// import MrtTable from 'ui/MrtTable';
// import { TABLE_BODY_PADDING } from 'src/constants/MRTTableCss';
// import { MRT_ColumnDef, MRT_RowData } from 'material-react-table';
// import { CompanyDetails } from '../Representative-card/reprsentativeCard.dto';
// import ApplicantCard from 'src/components/ApplicantCard';
// import ActivityCard from './ActivityCard';
// import { MOEI_OPERATING_LICENCE } from 'src/constants/landInterfaces';
// const OperatingLicensceInternalView = () => {
//   const { data: interfaceData } = useGetInterfaceByIDQuery(MOEI_OPERATING_LICENCE);
//   const { language } = useLanguage();
//   const uiConfiguration: IUiConfigurations = interfaceData?.[language?.toUpperCase() || 'EN'];
//   const navigate = useNavigate();
//   const { requestId } = useParams();
//   const { data, isLoading, isFetching } = useGetOperatingLicenseDetailsByIdQuery(
//     requestId as string,
//   );
//   const operatingLicData = data?.data?.output || [];
//   const taskId = operatingLicData?.taskId;
//   const [activeIndex, setActiveIndex] = useState(1);
//   const document = operatingLicData?.attachmentInfo?.find(
//     (item: any) => item?.attachmentTypeId === 'ATTYP_744',
//   );
//   const [subActivity, setSubActivity] = useState<string>('');
//   const [downloadFile, { isLoading: downloadDetailLoading, isFetching: downloadDetailFetching }] =
//     useLazyDownloadFileQuery();
//   const { getSubTransportActivityById, getTransportationActivityById } = useSubTransportActivity();
//   const [showOperatingLicense, setShowOperatingLicense] = useState<boolean>(false);
//   const stepStatus = {
//     ApplicationForm: true,
//     Payment: true,
//     Attachment: true,
//   };
//   console.log(document);
//   const [showMap, setShowMap] = useState(false);
//   const downloadPROCard = () => {
//     downloadFile(document?.id as string)
//       .unwrap()
//       .then((downloadData) => {
//         base64Download(
//           `data:${downloadData?.data?.output?.[0]?.fileType};base64,${downloadData?.data?.output?.[0]?.attachment?.content}`,
//           downloadData?.data?.output?.[0]?.fileName,
//         );
//       });
//   };
//   const isPreview = () => {
//     setShowOperatingLicense(true);
//   };
//   const tradeLicenseKey = [
//     {
//       label: uiConfiguration?.UI_LABELS?.TRADE_LICENCE_NUMBER || 'Trade license number',
//       value: (
//         <div className={lt('flex flex-wrap gap-2')}>
//           <Tag key={operatingLicData?.reqId} className={lt('rounded-2xl')} color='#F7F4EC'>
//             <div className={lt('flex items-center gap-2 justify-between p-[.4rem]')}>
//               <span className={lt('text-[#323438] font-normal text-xs')}>
//                 {operatingLicData?.company?.tradeLicNo}
//               </span>
//             </div>
//           </Tag>
//         </div>
//       ),
//     },
//   ];
//   const companyDetailsKey = [
//     {
//       label: uiConfiguration?.UI_LABELS?.COMPANY_NAME_AR || 'Company Name in Arabic',
//       value: operatingLicData?.company?.companyNameAR,
//     },
//     {
//       label: uiConfiguration?.UI_LABELS?.COMPANY_NAME_EN || 'Company Name in English',
//       value: operatingLicData?.company?.companyNameEN,
//     },
//     {
//       label: uiConfiguration?.UI_LABELS?.BUSINESS_ACTIVITY_TYPE || 'Type of Business Activity',
//       value: operatingLicData?.company?.companyType,
//     },
//     {
//       label:
//         uiConfiguration?.UI_LABELS?.COMMERCIAL_LICENSE_YEAR ||
//         'Year of obtaining a Commercial License',
//       value: <DateComponent inputDate={operatingLicData?.company?.tradeLicenseRegDate} />,
//     },
//     {
//       label: uiConfiguration?.UI_LABELS?.ADDRESS_AR || 'Address in Arabic',
//       value: operatingLicData?.company?.address,
//     },
//     {
//       label: uiConfiguration?.UI_LABELS?.ADDRESS_EN || 'Address in English',
//       value: operatingLicData?.company?.companyNameAR,
//     },
//     {
//       label: uiConfiguration?.UI_LABELS?.EMAIL_ADDRESS || 'Email Address',
//       value: operatingLicData?.company?.companyEmail,
//     },
//     {
//       label: uiConfiguration?.UI_LABELS?.PHONE_NUMBER || 'Phone Number',
//       value: operatingLicData?.company?.companyPhone,
//     },
//   ];
//   const operatingLicensceKey = [
//     {
//       label:
//         uiConfiguration?.UI_LABELS?.EMIRATE_ORGANIZATION ||
//         'Emirate where the organization is located',
//       value:
//         getDropDownValue(
//           uiConfiguration?.UI_LABELS?.EMIRATE_MASTER,
//           operatingLicData?.company?.emirate?.id,
//         ) || '-',
//     },
//     {
//       label: uiConfiguration?.UI_LABELS?.TRANSPORT_DESTINATION || 'Transport Destination or Entity',
//       value: getTransportationActivityById(operatingLicData?.transportType?.id) || '-',
//     },
//     {
//       label:
//         uiConfiguration?.UI_LABELS?.DESIGNATED_PARKING ||
//         'Does the company has designated Parkings ',
//       value:
//         operatingLicData?.isParkingAvailable !== null &&
//         operatingLicData?.isParkingAvailable !== undefined
//           ? operatingLicData?.isParkingAvailable === 'true'
//             ? uiConfiguration?.UI_LABELS?.YES || 'Yes'
//             : uiConfiguration?.UI_LABELS?.NO || 'No'
//           : '-',
//     },
//     {
//       label: uiConfiguration?.UI_LABELS?.PARKING_YARD || 'Parking Yards',
//       value: operatingLicData?.parkingAreaInfo?.parkingSpaceYards,
//       show: operatingLicData?.isParkingAvailable?.toString()?.toUpperCase() === 'TRUE',
//     },
//     {
//       label: uiConfiguration?.UI_LABELS?.UNIT_TYPE || 'Unit Type',
//       value: operatingLicData?.parkingAreaInfo?.unit,
//       show: operatingLicData?.isParkingAvailable?.toString()?.toUpperCase() === 'TRUE',
//     },
//     {
//       label: uiConfiguration?.UI_LABELS?.PARKING_TYPE || 'Parking Type',
//       value: operatingLicData?.parkingAreaInfo?.parkingSpaceOwnership,
//       show: operatingLicData?.isParkingAvailable?.toString()?.toUpperCase() === 'TRUE',
//     },
//     {
//       label: uiConfiguration?.UI_LABELS?.PARKING_COORDINATES || 'Parking Coordinates ',
//       value: operatingLicData?.parkingAreaInfo?.parkingSpaceLocation ? (
//         <span
//           onClick={() => setShowMap(true)}
//           className={lt('text-primary-500 cursor-pointer  underline')}
//         >
//           {uiConfiguration?.UI_LABELS?.VIEW_PARKING_LOCATION || 'View Parking Location'}
//         </span>
//       ) : (
//         '-'
//       ),
//       show: operatingLicData?.isParkingAvailable?.toString()?.toUpperCase() === 'TRUE',
//     },
//     {
//       label: uiConfiguration?.UI_LABELS?.CAPTIAL_INVESTMENT || 'Capital Investment',
//       value: <AEDValue value={operatingLicData?.capital} />,
//     },
//     {
//       label: uiConfiguration?.UI_LABELS?.NO_OF_VECHILES || 'Number of vehicles',
//       value: operatingLicData?.noOfVehicles,
//     },
//     {
//       label:
//         uiConfiguration?.UI_LABELS?.ORGANIZATION_STRUCTURE_10_VEHICLES ||
//         'Organizational Structure for 10 vehicles or more',
//       value: operatingLicData?.orgStructureForVech,
//       show: operatingLicData?.noOfVehicles > 9,
//     },
//   ];
//   const emergencyServiceProviderKey = [
//     {
//       label:
//         uiConfiguration?.UI_LABELS?.EMERGENCY_SERVICE_AVAILABLE || 'Emergency Service Available',
//       value:
//         operatingLicData?.isEmergServAvailable !== null &&
//         operatingLicData?.isEmergServAvailable !== undefined
//           ? operatingLicData?.isEmergServAvailable === 'true'
//             ? uiConfiguration?.UI_LABELS?.YES || 'Yes'
//             : uiConfiguration?.UI_LABELS?.NO || 'No'
//           : '-',
//     },
//     {
//       label: uiConfiguration?.UI_LABELS?.EMERGENCY_SERVICE_PROVIDER || 'Emergency Service Provider',
//       value: operatingLicData?.emergencyService?.emergencyServiceProvider,
//       show:
//         operatingLicData?.emergencyService?.isEmergServAvailable?.toString()?.toUpperCase() ===
//         'TRUE',
//     },
//     {
//       label:
//         uiConfiguration?.UI_LABELS?.OUTSOURCING_COMPANY_TRADE_LICENSCE ||
//         'Outsourcing Company Trade License Number',
//       value:
//         uiConfiguration?.UI_LABELS?.[
//           operatingLicData?.emergencyService?.emergencyServiceProvider
//         ] ||
//         operatingLicData?.emergencyService?.emergencyServiceProvider ||
//         '-',
//       show: operatingLicData?.emergencyService?.emergencyServiceProvider == 'OUTSOURCING',
//     },
//     {
//       label: uiConfiguration?.UI_LABELS?.OUTSOURCING_COMPANY_NAME || 'Outsourcing company name',
//       value: operatingLicData?.emergencyService?.companyName || '-',
//       show:
//         operatingLicData?.emergencyService?.isEmergServAvailable?.toString()?.toUpperCase() ===
//           'TRUE' && operatingLicData?.emergencyService?.emergencyServiceProvider == 'OUTSOURCING',
//     },
//     {
//       label:
//         uiConfiguration?.UI_LABELS?.OUTSOURCING_CONTRACT_DATE || 'Contract Start Date & End Date',
//       value: (
//         <div className='flex gap-2'>
//           <div>
//             {<DateComponent inputDate={operatingLicData?.emergencyService?.contractStartDate} /> ||
//               '-'}
//           </div>
//           <div>{'-'}</div>
//           <div>
//             {<DateComponent inputDate={operatingLicData?.emergencyService?.contractEndDate} /> ||
//               '-'}
//           </div>
//         </div>
//       ),
//       show:
//         operatingLicData?.emergencyService?.isEmergServAvailable?.toString()?.toUpperCase() ===
//           'TRUE' && operatingLicData?.emergencyService?.emergencyServiceProvider == 'OUTSOURCING',
//     },
//     {
//       label: uiConfiguration?.UI_LABELS?.NAME_OF_RESPONSIBLE_PERSON || 'Name of Responsible Person',
//       value: operatingLicData?.emergencyService?.inchargeName || '-',
//       show:
//         operatingLicData?.emergencyService?.isEmergServAvailable?.toString()?.toUpperCase() ===
//         'TRUE',
//     },
//     {
//       label: uiConfiguration?.UI_LABELS?.JOB_ROLE || 'Job Role',
//       value: operatingLicData?.emergencyService?.jobRole || '-',
//       show:
//         operatingLicData?.emergencyService?.isEmergServAvailable?.toString()?.toUpperCase() ===
//         'TRUE',
//     },

//     {
//       label: uiConfiguration?.UI_LABELS?.EMAIL_ADDRESS || 'Email Address',
//       value: operatingLicData?.emergencyService?.email || '-',
//       show:
//         operatingLicData?.emergencyService?.isEmergServAvailable?.toString()?.toUpperCase() ===
//         'TRUE',
//     },
//     {
//       label: uiConfiguration?.UI_LABELS?.PHONE_NUMBER || 'Phone Number',
//       value: operatingLicData?.emergencyService?.phoneNo || '-',
//       show:
//         operatingLicData?.emergencyService?.isEmergServAvailable?.toString()?.toUpperCase() ===
//         'TRUE',
//     },
//     {
//       label:
//         uiConfiguration?.UI_LABELS?.LIST_OF_ADMINISTRATORS ||
//         'List of Administrators & Technicians',
//       value: operatingLicData?.emergencyService?.intAdminTechNo || '-',
//       show:
//         operatingLicData?.emergencyService?.isEmergServAvailable?.toString()?.toUpperCase() ===
//           'TRUE' && operatingLicData?.emergencyService?.emergencyServiceProvider == 'INTERNAL_TEAM',
//     },
//   ];
//   const agentStation = [
//     {
//       label: uiConfiguration?.UI_LABELS?.AGENT_STATION_AVAILABLE || 'Station Available',
//       value:
//         operatingLicData?.stationAvailable !== null &&
//         operatingLicData?.stationAvailable !== undefined
//           ? operatingLicData?.stationAvailable === 'true'
//             ? uiConfiguration?.UI_LABELS?.YES || 'Yes'
//             : uiConfiguration?.UI_LABELS?.NO || 'No'
//           : '-',
//     },
//     {
//       label: uiConfiguration?.UI_LABELS?.OWNERSHIP_OF_STATION || 'Ownership of Station',
//       value: operatingLicData?.agentStation?.stationOwnership || '-',
//       show: operatingLicData?.stationAvailable?.toString()?.toUpperCase() === 'TRUE',
//       fullRow: true,
//     },
//     {
//       label: uiConfiguration?.UI_LABELS?.SATION_PLACE_YARD_AREA || 'Station Place Yard Area',
//       value: operatingLicData?.agentStation?.stationPlaceYard || '-',
//       show: operatingLicData?.stationAvailable?.toString()?.toUpperCase() === 'TRUE',
//     },
//     {
//       label: uiConfiguration?.UI_LABELS?.UNIT_TYPE || 'Unit Type',
//       value: operatingLicData?.agentStation?.unit || '-',
//       show: operatingLicData?.stationAvailable?.toString()?.toUpperCase() === 'TRUE',
//     },
//     {
//       label: uiConfiguration?.UI_LABELS?.NUMBER_OF_BATHROOM || 'Number of Bathrooms',
//       value: operatingLicData?.agentStation?.noOfBathrooms || '-',
//       show: operatingLicData?.stationAvailable?.toString()?.toUpperCase() === 'TRUE',
//     },
//     {
//       label: uiConfiguration?.UI_LABELS?.NUMBER_OF_REST_AREA || 'Number of Rest Area',
//       value: operatingLicData?.agentStation?.noOfRestArea || '-',
//       show: operatingLicData?.stationAvailable?.toString()?.toUpperCase() === 'TRUE',
//     },
//     {
//       label: uiConfiguration?.UI_LABELS?.NUMBER_OF_STORAGE_PLACES || 'Number of Storage Places',
//       value: operatingLicData?.agentStation?.noOfStoragePlaces || '-',
//       show: operatingLicData?.stationAvailable?.toString()?.toUpperCase() === 'TRUE',
//     },
//   ];
//   //   const options = [
//   //     {
//   //       label: uiConfiguration?.UI_LABELS?.YES || 'Yes',
//   //       value: 'YES',
//   //     },
//   //     {
//   //       label: uiConfiguration?.UI_LABELS?.NO || 'No',
//   //       value: 'NO',
//   //     },
//   //   ];
//   const fetchSubActivityActivity = async (id: string, activityId: string) => {
//     const result = await getSubTransportActivityById(id, activityId);
//     return result;
//   };
//   const columns: MRT_ColumnDef<MRT_RowData>[] = [
//     {
//       header: uiConfiguration?.UI_LABELS?.SEQ_NO || 'Seq No.',
//       Cell: ({ row }) => <span>{row.index + 1}</span>,
//       size: 30,
//     },
//     {
//       header: uiConfiguration?.UI_LABELS?.TRANSPORTATION_ACTIVITY || 'Transportation Activity',
//       Cell: ({ row }) => <span>{getTransportationActivityById(row?.original?.activityId)}</span>,
//       size: 30,
//     },
//     {
//       header:
//         uiConfiguration?.UI_LABELS?.TRANSPORTATION_SUB_ACTIVITY || 'Transportation Sub Activity',
//       Cell: ({ row }) => {
//         useEffect(() => {
//           const fetchSubActivity = async () => {
//             const result = await fetchSubActivityActivity(
//               row.original?.id,
//               row.original?.activityId,
//             );
//             setSubActivity(result); // Update state with fetched result
//           };

//           fetchSubActivity(); // Fetch sub-activity when the component mounts
//         }, [row.original?.id, row.original?.activityId]); // Re-fetch if id or activityId changes

//         return <span>{subActivity}</span>;
//       },
//       size: 30,
//     },
//     {
//       header: uiConfiguration?.UI_LABELS?.FEE_TO_PAID || 'Fees to be paid',
//       Cell: () => <AEDValue value={'500'} />,
//       size: 30,
//     },
//   ];
//   return (
//     <>
//       <PageTitle
//         breadcrumbItems={[
//           {
//             label:
//               uiConfiguration?.UI_LABELS?.REQUEST_TO_ISSUE_OPERATING_LICENSE ||
//               'Request to issue New Permanent Operating License for National Establishments',
//             path: '/udp/szlt/representative-card',
//           },
//         ]}
//         pageTitle={
//           uiConfiguration?.UI_LABELS?.REQUEST_TO_ISSUE_OPERATING_LICENSE ||
//           'Request to issue New Permanent Operating License for National Establishments'
//         }
//         pageButtons={
//           <ButtonGroup
//             children={
//               <>
//                 <CommonButton
//                   type='BACK'
//                   styleVariant='outline'
//                   onClick={() => navigate(getHomePath())}
//                 />
//                 {taskId?.length ? (
//                   <TaskManagement
//                     taskIdString={taskId}
//                     backURL={'/udp/land/my-applications'}
//                     updateApiCall={null}
//                     isUpdateDetailsOnTaskUpdate={false}
//                     customTaskButtonDisable={undefined}
//                   />
//                 ) : null}
//               </>
//             }
//           />
//         }
//       />
//       {isLoading || isFetching ? (
//         <div className={lt('flex justify-center items-center h-screen')}>
//           <Loader message='Data is Loading' />
//         </div>
//       ) : (
//         <>
//           <div className={lt('flex flex-col gap-4 ')}>
//             {operatingLicData?.company && (
//               <ApplicantCard
//                 applicantData={operatingLicData?.applicantInfo}
//                 companyData={operatingLicData?.company as CompanyDetails}
//                 tradeLicNo={operatingLicData?.company?.tradeLicNo as string}
//                 status={operatingLicData?.status as string}
//                 createdDate={operatingLicData?.createdDate as string}
//                 interfaceId={MOEI_OPERATING_LICENCE}
//                 applicationInfoPrimary={[
//                   {
//                     label: uiConfiguration?.UI_LABELS?.APPLICANT_NUMBER || 'Application Number',
//                     value: operatingLicData?.reqID || '-',
//                     icon: <Hash size={32} color='#92722A' weight='thin' />,
//                   },
//                   {
//                     label: uiConfiguration?.UI_LABELS?.APPLICATION_TYPE || 'Application Type',
//                     value:
//                       uiConfiguration?.UI_LABELS?.PERMANENT_OPERATING_LICENSCE ||
//                       'Permanent Operating License',
//                     icon: <File size={32} color='#92722A' weight='thin' className='mx-1' />,
//                   },
//                   {
//                     label: uiConfiguration?.UI_LABELS?.SUBMITTED_ON || 'Submitted On',
//                     value: <DateComponent inputDate={operatingLicData?.createdDate} />,
//                     icon: <CalendarBlank size={32} color='#92722A' weight='thin' />,
//                   },
//                 ]}
//               />
//             )}
//           </div>
//           {/* <div className={lt('flex flex-col gap-2')}>
//             {operatingLicData?.companyPRODetails?.map((companyData: CompanyPRODetail) => (
//               <LandApplicantCard
//                 applicantData={proCardData?.representative}
//                 companyData={companyData?.company as CompanyDetails}
//                 tradeLicNo={companyData?.tradeLicNo as string}
//                 status={proCardData?.status as string}
//                 createdDate={proCardData?.createdDate as string}
//               />
//             ))}
//           </div> */}

//           {operatingLicData?.status === 'APPROVED' && (
//             <div
//               className={lt(
//                 'flex  gap-4 items-center w-full h-full py-5 px-5 my-4 shadow rounded-xl justify-between bg-[#f9f7ed]',
//               )}
//             >
//               <div className={lt('flex gap-2')}>
//                 <div className={lt('text-[#323438] text-sm font-bold')}>
//                   {uiConfiguration?.UI_LABELS?.REPRESENTATIVE_CARD_ISSUED ||
//                     'Your Operating Licensce has been issued!'}
//                 </div>
//                 <div
//                   className={lt('text-[#92722A] text-sm font-normal cursor-pointer')}
//                   onClick={isPreview}
//                 >
//                   {uiConfiguration?.UI_LABELS?.REPRESENTATIVE_CARD_ISSUED_DESC ||
//                     'Click Here to Preview the Document'}
//                 </div>
//               </div>

//               {showOperatingLicense ? (
//                 <CaretCircleUp
//                   size={26}
//                   weight='thin'
//                   color='#92722A'
//                   onClick={() => setShowOperatingLicense(false)}
//                 />
//               ) : (
//                 <CaretCircleDown
//                   size={26}
//                   weight='thin'
//                   color='#92722A'
//                   onClick={() => setShowOperatingLicense(true)}
//                 />
//               )}
//               <div>
//                 {showOperatingLicense && (
//                   <div className={lt('flex flex-col gap-4 mt-4')}>
//                     <div className={lt('flex justify-between')}>
//                       <div>
//                         {uiConfiguration?.UI_LABELS?.REPRESENTATIVE_CARD || 'Representative Card'}
//                       </div>
//                       <CommonButton
//                         type='DOWNLOAD'
//                         loading={downloadDetailLoading || downloadDetailFetching}
//                         onClick={() => downloadPROCard()}
//                         icon={<DownloadSimple size={32} />}
//                       />
//                     </div>
//                     <Docviewer
//                       file={`${import.meta.env?.VITE_BASE_URL}/ixcommon/supporting/GetFileContentByPath?contentType=${document?.fileType || 'application/pdf'}&filePath=${document?.filePathId as string}`}
//                       // size={850}
//                       fitWidth
//                       className={lt(
//                         'w-full border border-aegold-600 !max-h-80vh rounded-md p-2 m-2',
//                       )}
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           <div className={lt('flex flex-col md:flex-row pt-2 gap-2')}>
//             <Card
//               rootClassName={lt(
//                 `block md:w-[368px] w-full !pt-[1.1rem]  h-36 md:h-full ${language === 'AR' ? '!pl-[1.1rem]' : '!pr-[1.1rem]'}`,
//               )}
//             >
//               <OperatingLicenseStepper
//                 uiConfiguration={uiConfiguration}
//                 filled={stepStatus}
//                 defaultIndex={activeIndex}
//                 onStepClick={(e: any) => {
//                   setActiveIndex(e);
//                 }}
//               />
//             </Card>
//             <Card style={{ width: '100%' }}>
//               <Accordion
//                 showFooterButtons={true}
//                 defaultIndex={activeIndex}
//                 clickedAccordion={(e: any) => setActiveIndex(e)}
//                 accordionItems={[
//                   {
//                     title: (
//                       <span>
//                         {uiConfiguration?.UI_LABELS?.APPLICATION_FORM || 'Application Form'}
//                       </span>
//                     ),
//                     content: (
//                       <>
//                         <div id='stepidx-2'>
//                           <SectionHeader
//                             title={
//                               uiConfiguration?.UI_LABELS?.COMPANY_DETAILS_AND_OPERATING_LICENSE ||
//                               'Company Details and Operating License Information'
//                             }
//                           />
//                           <div>
//                             <div className={lt('mt-4')}>
//                               {tradeLicenseKey?.map((item, index) => (
//                                 <div key={index}>
//                                   <RenderLabelAndValue
//                                     label={item?.label}
//                                     value={item?.value || '-'}
//                                   />
//                                 </div>
//                               ))}
//                             </div>
//                             {operatingLicData?.company && operatingLicData?.compan?.length > 0 && (
//                               <div className={lt('mt-6')}>
//                                 <div className={lt('bg-[#F9F6F0] p-4 rounded-md')}>
//                                   <div className={lt('text-sm font-bold text-[#92722A]')}>
//                                     {uiConfiguration?.UI_LABELS?.REGISTERED_COMPANY_DETAILS ||
//                                       'Registered Company Details'}
//                                   </div>
//                                 </div>
//                                 <div className={lt('mt-4')}>
//                                   <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3'>
//                                     {companyDetailsKey?.map((item, index) => (
//                                       <div key={index}>
//                                         <RenderLabelAndValue
//                                           label={item?.label}
//                                           value={item?.value || '-'}
//                                         />
//                                       </div>
//                                     ))}
//                                   </div>
//                                 </div>
//                                 <div className={lt('mt-6')}>
//                                   <div className={lt('bg-[#F9F6F0] p-4 rounded-md')}>
//                                     <div className={lt('text-sm font-bold text-[#92722A]')}>
//                                       {uiConfiguration?.UI_LABELS?.OPERATING_LICENSCE_DETAILS ||
//                                         'Operating License Details associated with the above registered company'}
//                                     </div>
//                                   </div>
//                                   <div
//                                     className={lt(
//                                       'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-[1.3rem] pb-[1.2rem] mt-6',
//                                     )}
//                                   >
//                                     {operatingLicensceKey?.map(
//                                       (item, index) =>
//                                         (item?.show === undefined || item?.show) && (
//                                           <div key={index}>
//                                             <RenderLabelAndValue
//                                               label={item?.label}
//                                               value={item?.value || '-'}
//                                             />
//                                           </div>
//                                         ),
//                                     )}
//                                   </div>
//                                 </div>
//                               </div>
//                             )}
//                             <div className={lt('mt-4')}>
//                               <SectionHeader
//                                 title={
//                                   uiConfiguration?.UI_LABELS?.COMPANY_SEGMENT || 'Company Segment'
//                                 }
//                               />
//                             </div>
//                             <div className={lt('mt-4')}>
//                               <div>
//                                 <RenderLabelAndValue
//                                   label={
//                                     uiConfiguration?.UI_LABELS?.PERSONALIZING_SERVICE ||
//                                     'Personalizing the service and based on the company segment you have to edit the following fields'
//                                   }
//                                   value={operatingLicData?.companySegment || '-'}
//                                 />
//                               </div>
//                             </div>
//                             <div className={lt('mt-4')}>
//                               <SectionHeader
//                                 title={
//                                   uiConfiguration?.UI_LABELS?.OWNERS_DETAILS || 'Owners Details'
//                                 }
//                               />
//                               <div className={lt('mt-4')}>
//                                 {operatingLicData?.company?.ownershipDetails?.map(
//                                   (ownershipDetail: IOwnershipDetail, index: number) => {
//                                     return (
//                                       <div key={index}>
//                                         <OwnershipDetails
//                                           ownershipDetails={ownershipDetail}
//                                           uiConfiguration={uiConfiguration}
//                                         />
//                                       </div>
//                                     );
//                                   },
//                                 )}
//                               </div>
//                             </div>
//                             <div className={lt('mt-4')}>
//                               <SectionHeader
//                                 title={uiConfiguration?.UI_LABELS?.ACTIVITIES || 'Activities'}
//                               />
//                               <div className={lt('mt-4')}>
//                                 <div
//                                   className={lt(
//                                     'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4',
//                                   )}
//                                 >
//                                   {operatingLicData?.transSubActivity &&
//                                     operatingLicData?.transSubActivity?.map(
//                                       (activity: TransportActivity, index: number) => (
//                                         <ActivityCard
//                                           activity={activity}
//                                           index={index}
//                                           uiConfiguration={uiConfiguration}
//                                         />
//                                       ),
//                                     )}
//                                 </div>
//                               </div>
//                             </div>
//                             <div className={lt('mt-4')}>
//                               <SectionHeader
//                                 title={
//                                   uiConfiguration?.UI_LABELS?.EMEREGENCY_SERVICE ||
//                                   'Emergency Service'
//                                 }
//                               />
//                               <div className={lt('mt-4')}>
//                                 <div
//                                   className={lt(
//                                     'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-[1.3rem] pb-[1.2rem] mt-6',
//                                   )}
//                                 >
//                                   {emergencyServiceProviderKey?.map(
//                                     (item, index) =>
//                                       (item?.show === undefined || item?.show) && (
//                                         <div key={index}>
//                                           <RenderLabelAndValue
//                                             label={item?.label}
//                                             value={item?.value || '-'}
//                                           />
//                                         </div>
//                                       ),
//                                   )}
//                                 </div>
//                               </div>
//                             </div>
//                             <div className={lt('mt-4')}>
//                               <SectionHeader
//                                 title={uiConfiguration?.UI_LABELS?.AGENT_STATION || 'Agent Station'}
//                               />
//                               <div className={lt('mt-4')}>
//                                 {agentStation?.map(
//                                   (item, index) =>
//                                     (item?.show === undefined || item?.show) && (
//                                       <div
//                                         key={index}
//                                         className={lt(
//                                           item?.fullRow ? 'md:col-span-2 lg:col-span-3' : '',
//                                         )}
//                                       >
//                                         <RenderLabelAndValue
//                                           label={item?.label}
//                                           value={item?.value || '-'}
//                                         />
//                                       </div>
//                                     ),
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </>
//                     ),
//                     accordianIndex: 1,
//                   },
//                   {
//                     title: (
//                       <span>
//                         {uiConfiguration?.UI_LABELS?.SUPPORTING_DOCUMENTS || 'Supporting Documents'}
//                       </span>
//                     ),
//                     content: (
//                       <>
//                         <div id='stepidx-3'>
//                           {/* <SectionHeader title={displayLabel('ATTACHMENT') || 'Attachment'} /> */}
//                           <Attachments
//                             files={operatingLicData?.attachments || []}
//                             attachmentID={MOEI_LAND_OPERATING_LICENCE}
//                             source='DB'
//                             requestId={operatingLicData?.reqId as string}
//                             type=''
//                             readOnly={true}
//                           />
//                         </div>
//                       </>
//                     ),
//                     accordianIndex: 2,
//                   },
//                   {
//                     title: (
//                       <div className={lt('flex gap-2 items-center')}>
//                         <span>
//                           {uiConfiguration?.UI_LABELS?.PAYMENT_DETAILS || 'Payment Details'}
//                         </span>
//                       </div>
//                     ),
//                     content: (
//                       <>
//                         <div id='stepidx-4'>
//                           <div>
//                             <SectionHeader
//                               title={
//                                 uiConfiguration?.UI_LABELS?.LIST_OF_ACTIVITIES ||
//                                 'List of Activities'
//                               }
//                             />
//                           </div>
//                           <div className={lt('mt-4')}>
//                             <MrtTable
//                               columns={columns}
//                               data={operatingLicData?.transSubActivity || []}
//                               enableSorting={false}
//                               enableRowActions={false}
//                               enableTopToolbar={false}
//                               enableColumnActions={false}
//                               muiTableBodyCellProps={TABLE_BODY_PADDING}
//                               state={{
//                                 isLoading: isLoading || isFetching,
//                               }}
//                             />
//                           </div>
//                           <div className={lt('mt-4 w-full flex justify-end items-center')}>
//                             <div
//                               className={lt(
//                                 'flex flex-col gap-5 md:w-min-[12rem] md:w-[30rem] items-end',
//                               )}
//                             >
//                               <div className={lt('flex w-full justify-between')}>
//                                 <div className={lt('text-sm font-medium text-[#323438]')}>
//                                   {uiConfiguration?.UI_LABELS?.TOTAL_NUMBER_OF_ACTIVITIES ||
//                                     'Total number of activities'}
//                                 </div>
//                                 <div className={lt('text-sm font-medium text-[#92722A]')}>
//                                   {operatingLicData?.transSubActivity?.length}
//                                 </div>
//                               </div>
//                               <div className={lt('flex w-full justify-between')}>
//                                 <div className={lt('text-sm font-medium text-[#323438]')}>
//                                   {uiConfiguration?.UI_LABELS?.FEES_TO_BE_PAID_FOR_EACH_ACTIVITY ||
//                                     'Fees to be paid for each activity'}
//                                 </div>

//                                 <div className={lt('text-sm font-medium text-[#92722A]')}>
//                                   <AEDValue value={500} />
//                                 </div>
//                               </div>
//                               <div
//                                 className={lt(
//                                   'flex  bg-[#CBA344] rounded-md p-4 w-full justify-between',
//                                 )}
//                               >
//                                 <div className={lt('text-sm font-medium text-[#FFFFFF]')}>
//                                   {uiConfiguration?.UI_LABELS?.TOTAL_AMOUNT ||
//                                     'Total Amount Payable'}
//                                 </div>
//                                 <div
//                                   className={lt('text-sm font-medium text-[#FFFFFF] text-nowrap')}
//                                 >
//                                   <AEDValue
//                                     value={500 * operatingLicData?.transSubActivity?.length}
//                                   />
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </>
//                     ),
//                     accordianIndex: 3,
//                   },
//                 ]}
//               />
//             </Card>
//           </div>
//         </>
//       )}

//       {showMap && (
//         <Modal
//           modalClassName='!min-w-[40rem] !max-w-[40rem] p-0'
//           confirmTitle='Close'
//           onConfirm={() => setShowMap(false)}
//           body={
//             <div className='flex flex-col gap-2'>
//               <SectionHeader
//                 title={uiConfiguration?.UI_LABELS?.PARKING_LOCATION || 'Parking Location'}
//               />
//               {operatingLicData?.parkingAreaInfo?.parkingSpaceLocation?.split(',')[0] ? (
//                 <ShowMapMarker
//                   location={{
//                     lat: Number(
//                       parseFloat(
//                         operatingLicData?.parkingAreaInfo?.parkingSpaceLocation?.split(',')[0],
//                       ),
//                     ),
//                     lng: Number(
//                       parseFloat(
//                         operatingLicData?.parkingAreaInfo?.parkingSpaceLocation?.split(',')[1],
//                       ),
//                     ),
//                   }}
//                 />
//               ) : null}
//             </div>
//           }
//           closeOnEsc={false}
//         />
//       )}
//     </>
//   );
// };

// export default OperatingLicensceInternalView;