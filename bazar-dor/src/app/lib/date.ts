"use cache";

export const banglaDate=async()=>new Intl.DateTimeFormat("bn-BD",{day:"numeric",month:"long",year:"numeric"}).format(new Date());