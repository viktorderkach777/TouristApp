using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TouristApp.Helpers
{
    public class CaptchaHelper
    {
        internal const string SessionKeyPrefix = "__Captcha";

        public static bool VerifyAndExpireSolution(HttpContext context,
            string challengeGuid,
            string attenptedSolution)
        {
            //немедлено удаляем решение Session[] для предотвращения атак повторением
            string solution = (string)context.Session.GetString(SessionKeyPrefix + challengeGuid);
            context.Session.Remove(SessionKeyPrefix + challengeGuid);
            return ((solution != null) && (attenptedSolution == solution));
        }
        public static string MakeRandomSolution()
        {
            Random rng = new Random(Guid.NewGuid().GetHashCode());
            int length = rng.Next(5, 7);
            char[] buf = new char[length];
            for (int i = 0; i < length; i++)
            {
                buf[i] = (char)('a' + rng.Next(26));
            }
            return new string(buf);
        }
    }
}
